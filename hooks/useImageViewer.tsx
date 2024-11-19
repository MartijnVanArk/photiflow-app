import { Portal } from "@gorhom/portal";
import { Image } from "expo-image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Dimensions, ViewProps } from "react-native";
import { twMerge } from "tailwind-merge";

import PanPinchView from "@/components/PanPinchView";
import CloseBackButton from "@/components/ui/CloseBackButton";
import { decodeSafePicUri } from "@/utils/pictureprocessing";

export type ImageViewerProps = {
  startVisible?: boolean;
  uri?: string;
  isSafeUri?: boolean;
  //  refComponent?: any;
};
const useImageViewer = (
  opts: ImageViewerProps = { startVisible: false, uri: "", isSafeUri: false },
) => {
  const [visible, setVisible] = useState(false);
  const [visibleFast, setVisibleFast] = useState(false);

  const visibility = useRef(new Animated.Value(0)).current;
  const [useUri, setUseUri] = useState<string>("");

  const showImageViewer = useCallback(
    (
      uri: string,
      isSafeUri: boolean = false, // refComponent?: any
    ) => {
      setUseUri(isSafeUri ? decodeSafePicUri(uri) : uri);

      setVisible(true);
      setVisibleFast(true);
      Animated.timing(visibility, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    },
    [visibility],
  );

  const hideImageViewer = useCallback(() => {
    setVisibleFast(false);
    Animated.timing(visibility, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setVisible(false);
    });
  }, [visibility]);

  useEffect(() => {
    if (opts.startVisible) {
      showImageViewer(opts.uri || "", opts.isSafeUri);
    }
  }, [opts.isSafeUri, opts.startVisible, opts.uri, showImageViewer]);

  const { width: winWitdh, height: winHeight } = Dimensions.get("window");

  const AnimatedExpoImage = Animated.createAnimatedComponent(Image);

  const ImageModal = ({ className, style, ...props }: ViewProps) => {
    return (
      <>
        {visible && (
          <Portal hostName="picture-viewer">
            <Animated.View
              className={twMerge(
                "w-full  bg-black h-full absolute top-0 left-0",
                className,
              )}
              style={[
                style,
                {
                  opacity: visibility,
                  //              transform: [{ scale: visibility }],
                },
              ]}
              {...props}
            >
              <PanPinchView
                minScale={1}
                initialScale={1}
                contentDimensions={{ width: winWitdh, height: winHeight }}
                containerDimensions={{ width: winWitdh, height: winHeight }}
              >
                <AnimatedExpoImage
                  sharedTransitionTag="previewimage"
                  contentFit="contain"
                  style={{ width: "100%", height: "100%" }}
                  source={{ uri: useUri }}
                ></AnimatedExpoImage>
              </PanPinchView>
              <CloseBackButton onPress={hideImageViewer} />
            </Animated.View>
          </Portal>
        )}
      </>
    );
  };

  return {
    viewerVisible: visible,
    viewerVisibleFast: visibleFast,
    showImageViewer,
    hideImageViewer,
    ImageModal,
  };
};

export default useImageViewer;
