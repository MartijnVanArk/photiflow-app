import { StatusBar } from "expo-status-bar";
import { Animated, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import GalleryListImage from "@/components/fragments/ListItems/GalleryListImage";
import PageHeader from "@/components/header/PageHeader";
import DynamicAvatar from "@/components/ui/DynamicAvatar";
import { generateExtraImageSampleData } from "@/data/imagelistsample";
import useGuestContext from "@/hooks/useGuestContext";
import useTheme from "@/hooks/useTheme";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const NUM_COLS = 3;
const tDim = Math.min(windowWidth, windowHeight) / NUM_COLS;

export default function MyPicturesScreen() {
  const { getVarColor } = useTheme();

  // const [headerVisible, setHeaderVisible] = React.useState(false);

  const { guestInfo } = useGuestContext();
  // const barRef = useRef<View>(null);

  // const scrollY = useRef(new Animated.Value(0)).current;
  // const measureHeight = useRef(0);

  // const scrollYClamped = Animated.diffClamp(scrollY, 0, measureHeight.current);

  // const handleScroll = Animated.event(
  //   [
  //     {
  //       nativeEvent: {
  //         contentOffset: { y: scrollY },
  //       },
  //     },
  //   ],
  //   {
  //     useNativeDriver: true,
  //   },
  // );

  // useEffect(() => {
  //   barRef.current?.measureInWindow(
  //     (x: number, y: number, width: number, height: number) => {
  //       measureHeight.current = height;
  //     },
  //   );
  //   if (!headerVisible) setHeaderVisible(true);
  // }, [barRef, headerVisible]);

  // const translateY = scrollYClamped.interpolate({
  //   inputRange: [0, measureHeight.current],
  //   outputRange: [0, -measureHeight.current],
  // });

  // console.log("rerender", measureHeight.current);

  return (
    <SafeAreaView className="h-full flex items-center justify-center">
      <Animated.View
        className=" w-full left-0 top-0"
        // style={{ zIndex: 1, transform: [{ translateY }] }}
      >
        <PageHeader
          handleInset={false}
          //          ref={barRef}
          titlei18n="screen-event-my-pictures"
          //          onLayout={onLayout}
          right={
            <DynamicAvatar
              size={14}
              name={guestInfo.name}
              imageUri={guestInfo.avatar}
            />
          }
        />
      </Animated.View>

      <StatusBar
        style="light"
        backgroundColor={getVarColor("--color-primary-default")}
      />

      <Animated.FlatList
        className=" w-full flex-1"
        horizontal={false}
        numColumns={NUM_COLS}
        // style={{ paddingTop: measureHeight.current }}
        // onScroll={handleScroll}
        scrollEventThrottle={16}
        data={generateExtraImageSampleData(20)}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <GalleryListImage
            targetHeight={tDim}
            targetWidth={tDim}
            item={item}
          />
        )}
      />
    </SafeAreaView>
  );
}
