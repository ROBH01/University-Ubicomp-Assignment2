import React from "react";
import { View } from "react-native";
import colors from "../assets/colors";

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
        //borderRadius: 15,
      }}
    ></View>
  );
};

export default RiskStatusRectangle;
