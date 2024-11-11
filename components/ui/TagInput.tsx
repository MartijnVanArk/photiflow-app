import React, { useRef, useState } from "react";
import { View, Platform, UIManager, LayoutAnimation } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import { TagInputProps } from "@/types/type";

import InputControl from "./InputControl";
import TagInputTag from "./TagInputTag";

const TagInput = ({
  className,
  icon,
  tags,
  triggerKeys = [",", ";", " "],
  onNewTags,
  ...props
}: TagInputProps) => {
  const [useTags, setUseTags] = useState<string[]>(tags);
  const [text, setText] = useState("");

  const inputRef = useRef<TextInput>(null);

  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const hasTag = (tag: string): boolean => {
    return useTags.findIndex((t) => t === tag) >= 0;
  };

  const killTagClick = (tag: string) => {
    const newTags = useTags.filter((t) => t !== tag);

    LayoutAnimation.spring();
    setUseTags(newTags);
    if (onNewTags) onNewTags(newTags);
  };

  const onBlur = (event: { nativeEvent: { text: string } }) => {
    textChange(event.nativeEvent.text);
  };

  const textChange = (val: string) => {
    const keys = triggerKeys.map((str) =>
      (str + "").replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1"),
    );

    const regexp = new RegExp(keys.join("|"));

    if (regexp.test(val)) {
      if (triggerKeys.includes(text)) {
        setText("");
        return inputRef.current?.clear();
      }

      const possibleTag = val.replace(regexp, "").trim();

      if (possibleTag && !hasTag(possibleTag)) {
        const newTags = [...useTags, possibleTag];
        setUseTags(newTags);
        if (onNewTags) onNewTags(newTags);
        setText("");
        return inputRef.current?.clear();
      } else {
        return setText("");
      }
    }
    return setText(val);
  };

  const endEdit = () => {
    textChange(text + triggerKeys[0]);
  };

  return (
    <View className={className}>
      <InputControl
        value={text}
        onChangeText={textChange}
        onEndEditing={endEdit}
        ref={inputRef}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="done"
        keyboardType="default"
        placeholder="Enter your tags"
        onBlur={Platform.OS === "ios" ? onBlur : undefined}
        inputMode="text"
        icon={icon ? icon : { name: "label-multiple-outline" }}
        {...props}
      />
      <View className="flex flex-row  flex-wrap gap-2">
        {useTags.map((t: string) => (
          <TagInputTag tag={t} key={t} onDelete={killTagClick} />
        ))}
      </View>
    </View>
  );
};

export default TagInput;
