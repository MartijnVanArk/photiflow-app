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
          // //todo call api, for now we fake a timeout
          // setTimeout(() => {
          //   if (validateEventId(action.payload.EventId)) {
          //     EventStateDispatch({
          //       type: EventAuthActionTypes.TRYJOINRESULT,
          //       payload: {
          //         Event: fakeTestEvent,
          //       },
          //     });
          //   } else {
          //     EventStateDispatch({
          //       type: EventAuthActionTypes.TRYJOINRESULT,
          //       payload: {
          //         Event: null,
          //       },
          //     });
          //   }
          // }, 2000);

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
      }
    },
    [EventStateDispatch, addGuestInfoToImage, pictureStateDispatch],
  );

  // const {pictureState, pictureState}

  return (
    <CommandCenterContext.Provider value={{ perform }}>
      {children}
    </CommandCenterContext.Provider>
  );
};

export default CommandCenterProvider;
