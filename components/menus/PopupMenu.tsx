import { Portal } from "@gorhom/portal";
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  PropsWithChildren,
} from "react";
import {
  StyleSheet,
  Platform,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Animated,
  View,
} from "react-native";

import useKeyboard from "@/hooks/useKeyboard";
import useTheme from "@/hooks/useTheme";

export interface PopupMenuProps extends PropsWithChildren {
  trigger: React.ReactNode;
  hostname?: string;
}

const isIOS = Platform.OS === "ios";

const { width: layoutWidth, height: layoutHeight } = Dimensions.get("window");

export default function PopupMenu({
  trigger,
  hostname = "popup-menu",
  children,
  ...props
}: PopupMenuProps) {
  //@ts-ignore
  const triggerWrapperRef = useRef<TouchableOpacity>(null);
  const itemsWrapperRef = useRef<View>(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const { getVarColor } = useTheme();

  const [triggerDimensions, setTriggerDimensions] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  const [modalDimensions, setModalDimensions] = useState({
    width: 0,
    height: 0,
  });

  const { keyboardHeight } = useKeyboard();

  const styles = StyleSheet.create({
    modalWrapper: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 10,
    },

    button: {
      width: "auto",
      alignSelf: "center",
    },
    activeSection: {
      backgroundColor: getVarColor("--color-light-default"),
      borderRadius: 10,
      alignSelf: "flex-start",
      ...Platform.select({
        ios: {
          alignSelf: "flex-start",
          width: layoutWidth * 0.5,

          borderRadius: 13,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.35,
          shadowRadius: 100,
        },
        android: {
          maxWidth: layoutWidth * 0.7,
          alignSelf: "flex-start",
          elevation: 8,
        },
      }),
      zIndex: 99,
    },
    overlay: {
      ...Platform.select({
        ios: {
          borderRadius: 13,
        },
      }),
    },
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const calculateDimensions = () => {
    triggerWrapperRef?.current?.measureInWindow(
      (x: number, y: number, width: number, height: number) => {
        setTriggerDimensions({
          top: Math.max(y, 0),
          left: x,
          width,
          height,
        });
      },
    );

    setTimeout(() => {
      itemsWrapperRef?.current?.measureInWindow((x, y, width, height) => {
        setModalDimensions({ width, height });
      });
    }, 100);
  };

  useEffect(() => {
    //  if (menuVisible) {
    if (triggerWrapperRef?.current) calculateDimensions();
    //   }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuVisible, itemsWrapperRef, setModalDimensions]);

  const closeModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();

    Animated.timing(slideAnim, {
      toValue: -25,
      duration: 200,
      useNativeDriver: true,
    }).start((_finished) => {
      setMenuVisible(false);
      setModalDimensions({ width: 0, height: 0 });
      setTriggerDimensions({ top: 0, left: 0, width: 0, height: 0 });
    });
  };

  const menuPos = useMemo(() => {
    let left = 0;
    let top = 0;

    left =
      triggerDimensions.left - modalDimensions.width + triggerDimensions.width;

    if (triggerDimensions.left - modalDimensions.width < 0)
      left = triggerDimensions.left;

    if (isIOS) {
      const initialTriggerTop =
        triggerDimensions.top + triggerDimensions.height + 10;
      if (
        modalDimensions.height + initialTriggerTop >
        layoutHeight - keyboardHeight
      )
        top = triggerDimensions.top - modalDimensions.height - 10;
      else top = initialTriggerTop;
    } else {
      const initialTriggerTop =
        triggerDimensions.top +
        triggerDimensions.height +
        //@ts-expect-error fine like this
        (StatusBar !== undefined ? StatusBar.currentHeight : 0);

      top =
        initialTriggerTop + modalDimensions.height >
        layoutHeight - keyboardHeight
          ? initialTriggerTop -
            triggerDimensions.height -
            modalDimensions.height
          : initialTriggerTop;
    }

    console.log("did top left ", top, left, modalDimensions, triggerDimensions);

    return { top, left };
  }, [modalDimensions, triggerDimensions, keyboardHeight]);

  const menuPositionStyles = { left: menuPos.left, top: menuPos.top };

  useEffect(() => {
    if (modalDimensions.width !== 0 && triggerDimensions.left !== 0) {
      setTimeout(() => {
        console.log("do anim");
        fadeAnim.setValue(0);
        slideAnim.setValue(-25);
        Animated.spring(fadeAnim, {
          toValue: 1,
          bounciness: 2,
          useNativeDriver: true,
        }).start(({ finished }) => {});
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }, 10);
    }
  }, [fadeAnim, modalDimensions, slideAnim, triggerDimensions]);

  const showMenu = () => {
    setMenuVisible(true);
  };

  return (
    <>
      <TouchableOpacity onPress={() => showMenu()} ref={triggerWrapperRef}>
        {trigger}
      </TouchableOpacity>
      <Portal hostName={hostname}>
        {menuVisible && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={closeModal}
            style={styles.modalWrapper}
          >
            <Animated.View
              ref={itemsWrapperRef}
              collapsable={false}
              style={[
                {
                  opacity: fadeAnim,
                  // transform: [{ translateY: slideAnim }],
                  // transformOrigin: "top",
                },
                styles.activeSection,
                menuPositionStyles,
              ]}
            >
              {Array.isArray(children)
                ? children.map((childrenItem, idx) => {
                    return React.cloneElement(childrenItem, {
                      closeModal,
                      total: children.length,
                      index: idx,
                      key: "popup-menu-item" + idx,
                    });
                  })
                : //@ts-expect-error cant really cast
                  React.cloneElement(children, {
                    closeModal,
                    index: 0,
                    total: 0,
                  })}
            </Animated.View>
          </TouchableOpacity>
        )}
      </Portal>
    </>
  );
}
