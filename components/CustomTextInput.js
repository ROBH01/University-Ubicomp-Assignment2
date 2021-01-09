import React from "react";
import { TextInput } from "react-native";

const CustomTextInput = ({
  marginTop,
  height,
  width,
  backgroundColor,
  alignSelf,
  textAlign,
  placeholder,
  keyboardType,
  onChangeText,
  maxLength,
  editable,
}) => {
  return (
    <TextInput
      style={{
        marginTop: marginTop,
        height: height,
        width: width,
        backgroundColor: backgroundColor,
        alignSelf: alignSelf,
        textAlign: textAlign,
        elevation: 6,
      }}
      placeholder={placeholder}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      maxLength={maxLength}
      editable={editable}
    ></TextInput>
  );
};

export default CustomTextInput;
