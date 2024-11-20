import { PropsWithChildren, useCallback } from "react";

import { CCActions, CCActionTypes } from "@/actions/CommandCenterActions";
import { EventAuthActionTypes } from "@/actions/EventAuthActions";
import { PictureActionTypes } from "@/actions/PictureActions";
import { publicEventsApi } from "@/api/PublicEventApi/PublicEventApiClient";
import { CommandCenterContext } from "@/context/base/CommandCenterContext";
import useEventAuthContext from "@/hooks/useEventAuthContext";
import useGuestContext from "@/hooks/useGuestContext";
import usePictureContext from "@/hooks/usePictureContext";
import { InternalImageData } from "@/types/pictureinfo";
import {
  processCameraPicture,
  processGalleryPicture,
} from "@/utils/pictureprocessing";

const CommandCenterProvider = ({ children }: PropsWithChildren) => {
  const { EventStateDispatch } = useEventAuthContext();
  const { pictureStateDispatch } = usePictureContext();
  const { guestInfo } = useGuestContext();

  const addGuestInfoToImage = useCallback(
    (img: InternalImageData): InternalImageData => {
      img.guest.avatar = guestInfo.avatar;
      img.guest.email = guestInfo.email;
      img.guest.name = guestInfo.name;
      img.guest.uid = guestInfo.uid;
      return img;
    },
    [guestInfo],
  );

  const perform = useCallback(
    (action: CCActions) => {
      console.log("Command center ", action);

      switch (action.type) {
        case CCActionTypes.TRY_JOIN_EVENT: {
          EventStateDispatch({
            type: EventAuthActionTypes.TRYJOINSTART,
            payload: {
              EventId: action.payload.EventId,
            },
          });

          const tryJoin = async () => {
            const didRegister = await publicEventsApi.registerDevice(
              action.payload.EventId,
            );

            if (didRegister) {
              const eventInfo = await publicEventsApi.getEventInfo();

              if (eventInfo) {
                EventStateDispatch({
                  type: EventAuthActionTypes.TRYJOINRESULT,
                  payload: {
                    lastToken: publicEventsApi.BEARER_TOKEN,
                    Event: eventInfo,
                  },
                });

                return true;
              }
            }

            EventStateDispatch({
              type: EventAuthActionTypes.TRYJOINRESULT,
              payload: {
                lastToken: "",
                Event: null,
              },
            });

            return false;
          };

          tryJoin();

          break;
        }

        case CCActionTypes.LEAVE_EVENT: {
          // call api logout stuff
          EventStateDispatch({
            type: EventAuthActionTypes.LEAVE,
          });
          pictureStateDispatch({
            type: PictureActionTypes.CLEAR_PICTURE,
          });

          break;
        }
        case CCActionTypes.ADD_PIC_FROM_CAMERA: {
          processCameraPicture(action.payload.cameraPhoto).then((baseImage) => {
            pictureStateDispatch({
              type: PictureActionTypes.NEW_PICTURE,
              payload: {
                photo: addGuestInfoToImage(baseImage),
              },
            });
          });
          break;
        }
        case CCActionTypes.ADD_PIC_FROM_GALLERY: {
          processGalleryPicture(action.payload.galleryPhoto).then(
            (baseImage) => {
              pictureStateDispatch({
                type: PictureActionTypes.NEW_PICTURE,
                payload: {
                  photo: addGuestInfoToImage(baseImage),
                },
              });
            },
          );
          break;
        }
        case CCActionTypes.UPLOAD_PHOTO: {
          pictureStateDispatch({
            type: PictureActionTypes.SET_PRE_UPLOAD_INFO,
            payload: action.payload,
          });

          const upload = async () => {
            let uploadOK = true;

            await new Promise((resolve) => setTimeout(resolve, 1000));

            // const url = await publicEventsApi.makeUploadUrl(
            //   action.payload.guestName,
            //   action.payload.comment,
            //   action.payload.tags,
            // );

            // if (url) {
            //   const jpeg = await loadAsJpeg(action.payload.uri);

            //   const result = await publicEventsApi.uploadJpegPhoto(url, jpeg);

            //   if (result && result.status === 200) {
            //     uploadOK = true;
            //   }
            // }

            pictureStateDispatch({
              type: PictureActionTypes.WAS_UPLOADED,
              payload: {
                success: uploadOK,
              },
            });
          };

          upload();

          break;
        }
      }
    },
    [EventStateDispatch, addGuestInfoToImage, pictureStateDispatch],
  );

  return (
    <CommandCenterContext.Provider value={{ perform }}>
      {children}
    </CommandCenterContext.Provider>
  );
};

export default CommandCenterProvider;
