import React from "react";
import { TextInput, View, StyleSheet } from "react-native";

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
      }}
      placeholder={placeholder}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      maxLength={maxLength}
    ></TextInput>
  );
};

export default CustomTextInput;
