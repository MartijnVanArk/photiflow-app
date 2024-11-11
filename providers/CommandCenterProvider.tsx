import { PropsWithChildren, useCallback } from "react";

import { CCActions, CCActionTypes } from "@/actions/CommandCenterActions";
import { EventAuthActionTypes } from "@/actions/EventAuthActions";
import { PictureActionTypes } from "@/actions/PictureActions";
import { CommandCenterContext } from "@/context/base/CommandCenterContext";
import useEventAuthContext from "@/hooks/useEventAuthContext";
import useGuestContext from "@/hooks/useGuestContext";
import usePictureContext from "@/hooks/usePictureContext";
import {
  processCameraPicture,
  processGalleryPicture,
} from "@/lib/pictureprocessing";
import { validateEventId } from "@/lib/storage";
import { fakeTestEvent } from "@/reducers/EventAuthReducer";
import { InternalImageData } from "@/types/pictureinfo";

const CommandCenterProvider = ({ children }: PropsWithChildren) => {
  const { EventStateDispatch } = useEventAuthContext();
  const { pictureStateDispatch } = usePictureContext();
  const { guestInfo } = useGuestContext();

  const addGuestInfoToImage = (img: InternalImageData): InternalImageData => {
    img.guest.avatar = guestInfo.avatar;
    img.guest.email = guestInfo.avatar;
    img.guest.name = guestInfo.avatar;
    return img;
  };

  const perform = useCallback(
    (action: CCActions) => {
      console.log("Command center ", action);

      switch (action.type) {
        case CCActionTypes.TRY_JOIN_Event: {
          EventStateDispatch({
            type: EventAuthActionTypes.TRYJOINSTART,
            payload: {
              EventId: action.payload.EventId,
            },
          });

          //todo call api, for now we fake a timeout
          setTimeout(() => {
            if (validateEventId(action.payload.EventId)) {
              EventStateDispatch({
                type: EventAuthActionTypes.TRYJOINRESULT,
                payload: {
                  Event: fakeTestEvent,
                },
              });
            } else {
              EventStateDispatch({
                type: EventAuthActionTypes.TRYJOINRESULT,
                payload: {
                  Event: null,
                },
              });
            }
          }, 2000);

          break;
        }

        case CCActionTypes.LEAVE_Event: {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [EventStateDispatch, pictureStateDispatch],
  );

  // const {pictureState, pictureState}

  return (
    <CommandCenterContext.Provider value={{ perform }}>
      {children}
    </CommandCenterContext.Provider>
  );
};

export default CommandCenterProvider;
