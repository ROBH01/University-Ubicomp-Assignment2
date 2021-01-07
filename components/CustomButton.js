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
  const addUserDetailsToContext = () => {
    // TODO: Add this data to the database or local storage!
    onPressOut();
  };

  return (
    <Pressable
      onPressOut={addUserDetailsToContext}
      disabled={disabled}
      style={({ pressed }) => [
        {
          backgroundColor: disabled ? "gray" : "#008000",
          height: height,
          width: pressed ? parseInt(width) - 5 + "%" : width,
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
