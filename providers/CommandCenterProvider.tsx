import { PropsWithChildren, useCallback } from "react";

import { CCActions, CCActionTypes } from "@/actions/CommandCenterActions";
import { PartyAuthActionTypes } from "@/actions/PartyAuthActions";
import { PictureActionTypes } from "@/actions/PictureActions";
import { CommandCenterContext } from "@/context/base/CommandCenterContext";
import usePartyAuthContext from "@/hooks/usePartyAuthContext";
import usePictureContext from "@/hooks/usePictureContext";
import { validatePartyId } from "@/lib/partyIdAuth";
import {
  processCameraPicture,
  processGalleryPicture,
} from "@/lib/pictureprocessing";
import { fakeTestparty } from "@/reducers/PartyAuthReducer";

const CommandCenterProvider = ({ children }: PropsWithChildren) => {
  const { partyStateDispatch } = usePartyAuthContext();
  const { pictureStateDispatch } = usePictureContext();

  const perform = useCallback(
    (action: CCActions) => {
      //      console.log("Command center ", action);

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
          //todo: call API and wrap
          partyStateDispatch({
            type: PartyAuthActionTypes.LEAVE,
          });
          break;
        }
        case CCActionTypes.ADD_PIC_FROM_CAMERA: {
          processCameraPicture(action.payload.cameraPhoto).then((baseImage) => {
            console.log("baseImage ", baseImage);
            pictureStateDispatch({
              type: PictureActionTypes.NEW_PICTURE,
              payload: {
                photo: baseImage,
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
                  photo: baseImage,
                },
              });
            },
          );
          break;
        }
      }
    },
    [partyStateDispatch],
  );

  // const {pictureState, pictureState}

  return (
    <CommandCenterContext.Provider value={{ perform }}>
      {children}
    </CommandCenterContext.Provider>
  );
};

export default CommandCenterProvider;