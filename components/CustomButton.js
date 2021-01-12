import React from "react";
import { Text, Pressable } from "react-native";

// This is a customised button that uses Pressable
const CustomButton = ({
  name,
  height,
  width,
  disabled,
  onPressOut,
  textFontSize,
  marginTop,
}) => {
  let animationWidth = 2;
  return (
    <Pressable
      onPressOut={onPressOut}
      disabled={disabled}
      style={({ pressed }) => [
        {
          backgroundColor: disabled ? "gray" : "#2196F3",
          height: height,
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
          color: "white",
        }}
      >
        {name}
      </Text>
    </Pressable>
  );
};

export default CustomButton;
