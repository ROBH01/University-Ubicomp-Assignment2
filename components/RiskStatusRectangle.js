import React, { useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  Button,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
