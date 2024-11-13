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

import useKeyboardHeight from "@/hooks/useKeyboardHeight";
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

  const { keyboardHeight } = useKeyboardHeight();

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
      opacity:
        modalDimensions.width !== 0 && triggerDimensions.left !== 0 ? 1 : 0,
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

  //const fadeAnim = useRef(new Animated.Value(0)).current;

  const calculateDimensions = () => {
    triggerWrapperRef?.current?.measureInWindow((x, y, width, height) => {
      setTriggerDimensions({
        top: Math.max(y, 0),
        left: x,
        width,
        height,
      });
    });

    setTimeout(() => {
      console.log("content dim 1 , ");
      itemsWrapperRef?.current?.measureInWindow((x, y, width, height) => {
        console.log("content dim 2");
        setModalDimensions({ width, height });
      });
    }, 100);
  };

  useEffect(() => {
    console.log("popup ", menuVisible);
    if (menuVisible) {
      if (triggerWrapperRef?.current) calculateDimensions();
    }
    console.log(modalDimensions, triggerDimensions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuVisible, itemsWrapperRef, setModalDimensions]);

  const closeModal = () => {
    setMenuVisible(false);
    setModalDimensions({ width: 0, height: 0 });
    setTriggerDimensions({ top: 0, left: 0, width: 0, height: 0 });
  };

  const { top, left } = useMemo(() => {
    let left = 0;
    let top = 0;

    left =
      triggerDimensions.left - modalDimensions.width + triggerDimensions.width;
    // if the popup is outside the screen from the left
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

    return { top, left };
  }, [modalDimensions, triggerDimensions, keyboardHeight]);

  const menuPositionStyles = { left, top };

  const test = () => {
    console.log("in test : ", hostname);
    return true;
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setMenuVisible(true)}
        ref={triggerWrapperRef}
      >
        {trigger}
      </TouchableOpacity>
      <Portal hostName={hostname}>
        {menuVisible && test() && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={closeModal}
            style={styles.modalWrapper}
          >
            <Animated.View
              ref={itemsWrapperRef}
              collapsable={false}
              style={[styles.activeSection, menuPositionStyles]}
            >
              {/* pass the closeModal to children prop  */}
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
