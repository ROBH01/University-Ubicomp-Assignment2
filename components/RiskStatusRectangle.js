import React from "react";
import { View } from "react-native";

const RiskStatusRectangle = ({
  statusColor,
  width,
  height,
  alignSelf,
  borderWidth,
}) => {
  return (
    <View
      style={{
        backgroundColor: statusColor,
        width: width,
        height: height,
        alignSelf: alignSelf,
        borderWidth: borderWidth,
      }}
    ></View>
  );
};

export default RiskStatusRectangle;
