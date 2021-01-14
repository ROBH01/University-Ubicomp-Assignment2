import React from "react";
import { Text, Pressable } from "react-native";
import colors from "../assets/colors";

// This is a customised button that uses Pressable
const CustomButton = ({ name, height, width, disabled, onPressOut, textFontSize, marginTop }) => {
  let animationWidth = 0.5;
  return (
    <Pressable
      onPressOut={onPressOut}
      disabled={disabled}
      style={({ pressed }) => [
        {
          backgroundColor: disabled ? colors.gray : colors.lightBlue,
          height: height,
          borderWidth: pressed ? 1 : 0,
          borderColor: pressed ? colors.white : colors.lightBlue,
          width: pressed ? parseInt(width) - animationWidth + "%" : width,
          alignSelf: "center",
          justifyContent: "center",
          elevation: 10,
          marginTop: marginTop,
        },
      ]}
    >
      <Text
        style={{
          textAlign: "center",
          height: "100%",
          textAlignVertical: "center",
          fontSize: textFontSize,
          color: colors.white,
        }}
      >
        {name}
      </Text>
    </Pressable>
  );
};

export default CustomButton;
