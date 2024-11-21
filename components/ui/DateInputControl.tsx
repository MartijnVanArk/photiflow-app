import { MaterialCommunityIcons } from "@expo/vector-icons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  Pressable,
  TextInput,
  TextInputProps,
  Platform,
  Modal,
} from "react-native";

import useTheme from "@/hooks/useTheme";

import ThemeBasicButton from "./themed/ThemeBasicButton";

export interface DateInputControlProps extends TextInputProps {
  date: Date;
  wrapperClassName?: string;
  onDateChange?: (date: Date) => void;
}

export default function DateInputControl({
  date,
  onDateChange,
  wrapperClassName,
  ...props
}: DateInputControlProps) {
  const { t } = useTranslation();

  const [useDate, setUseDate] = useState<Date>(date);

  const [tmpDate, setTmpDate] = useState<Date>(
    !isNaN(date.getTime()) ? date : new Date(),
  );
  const [pickerVisible, setPickerVisible] = useState<boolean>(false);

  const updateDate = (date: Date) => {
    setUseDate(date);
    if (onDateChange) onDateChange(date);
  };

  const displayDate = !isNaN(useDate.getTime()) ? useDate.toDateString() : "";

  const togglePicker = () => {
    setPickerVisible(!pickerVisible);
  };

  const { getVarColor } = useTheme();

  const picker = (
    <RNDateTimePicker
      maximumDate={new Date()}
      minimumDate={new Date(1900, 0, 1)}
      value={!isNaN(useDate.getTime()) ? useDate : new Date()}
      mode="date"
      display="spinner"
      onChange={(event, date) => {
        if (event.type === "set") {
          if (Platform.OS === "ios") {
            setTmpDate(date || useDate);
          } else {
            updateDate(date || useDate);
            setPickerVisible(false);
          }
        } else {
          setPickerVisible(false);
          //              togglePicker();
        }
      }}
    />
  );

  return (
    <View className={` ${wrapperClassName}`}>
      <View
        accessible={false}
        className={`flex flex-row justify-start items-center relative bg-inputbg rounded-xl border border-overlay focus:border-overlay $`}
      >
        <MaterialCommunityIcons
          name={"calendar"}
          size={24}
          className="pl-5"
          color={getVarColor("--color-primary-default")}
        />

        <Pressable
          className="flex-1 flex-row justify-between items-center rounded-xl p-1"
          onPress={togglePicker}
        >
          <TextInput
            value={displayDate}
            editable={false}
            placeholder=""
            cursorColor="black"
            placeholderTextColor="#999"
            className={`p-4  text-black font-NunitoSemiBold text-lg flex-1  text-left`}
            onPressIn={togglePicker}
            {...props}
          />
        </Pressable>
      </View>

      {pickerVisible && Platform.OS === "ios" && (
        <Modal visible={pickerVisible} transparent={true}>
          <View
            className="flex-1 justify-center items-center"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <View className="p-8 rounded-2xl bg-light justify-center items-center">
              {picker}

              <View className="flex-row gap-4 items-center justify-center">
                <ThemeBasicButton
                  className="flex"
                  title={t("generic-btn-ok")}
                  onPress={() => {
                    updateDate(tmpDate);
                    togglePicker();
                  }}
                />
                <ThemeBasicButton
                  variant="secondary"
                  className="flex"
                  title={t("generic-btn-cancel")}
                  onPress={() => {
                    togglePicker();
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}

      {pickerVisible && Platform.OS === "android" && picker}
    </View>
  );
}
