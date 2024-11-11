import { PropsWithChildren, useCallback } from "react";

import { CCActions, CCActionTypes } from "@/actions/CommandCenterActions";
import { PartyAuthActionTypes } from "@/actions/PartyAuthActions";
import { PictureActionTypes } from "@/actions/PictureActions";
import { CommandCenterContext } from "@/context/base/CommandCenterContext";
import useGuestContext from "@/hooks/useGuestContext";
import usePartyAuthContext from "@/hooks/usePartyAuthContext";
import usePictureContext from "@/hooks/usePictureContext";
import {
  processCameraPicture,
  processGalleryPicture,
} from "@/lib/pictureprocessing";
import { validatePartyId } from "@/lib/storage";
import { fakeTestparty } from "@/reducers/PartyAuthReducer";
import { InternalImageData } from "@/types/pictureinfo";

const CommandCenterProvider = ({ children }: PropsWithChildren) => {
  const { partyStateDispatch } = usePartyAuthContext();
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
        case CCActionTypes.TRY_JOIN_PARTY: {
          partyStateDispatch({
            type: PartyAuthActionTypes.TRYJOINSTART,
            payload: {
              partyId: action.payload.partyId,
            },
          });

          //todo call api, for now we fake a timeout
          setTimeout(() => {
            if (validatePartyId(action.payload.partyId)) {
              partyStateDispatch({
                type: PartyAuthActionTypes.TRYJOINRESULT,
                payload: {
                  party: fakeTestparty,
                },
              });
            } else {
              partyStateDispatch({
                type: PartyAuthActionTypes.TRYJOINRESULT,
                payload: {
                  party: null,
                },
              });
            }
          }, 2000);

          break;
        }

        case CCActionTypes.LEAVE_PARTY: {
          partyStateDispatch({
            type: PartyAuthActionTypes.LEAVE,
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
    [partyStateDispatch, pictureStateDispatch],
  );

  // const {pictureState, pictureState}

  return (
    <CommandCenterContext.Provider value={{ perform }}>
      {children}
    </CommandCenterContext.Provider>
  );
};

export default CommandCenterProvider;
