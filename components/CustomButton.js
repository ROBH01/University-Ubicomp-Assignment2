import React from "react";
import { Text, Pressable } from "react-native";

// This is a customised button that uses Pressable
const CustomButton = ({ name, height, width, disabled, onPressOut }) => {
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
          height: pressed ? parseInt(height) - 4 : height,
          width: pressed ? parseInt(width) - 5 + "%" : width,
          alignSelf: "center",
          justifyContent: "center",
          elevation: 10,
        },
      ]}
    >
      <Text
        style={{
          textAlign: "center",
          height: "100%",
          textAlignVertical: "center",
          fontSize: 18,
          color: "white",
        }}
      >
        {name}
      </Text>
    </Pressable>
  );
};

export default CustomButton;
