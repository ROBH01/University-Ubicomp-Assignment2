import React, { useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  Button,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const RiskStatusRectangle = ({ statusColor, width, height }) => {
  return (
    <View
      style={{ backgroundColor: statusColor, width: width, height: height }}
    ></View>
  );
};

export default RiskStatusRectangle;
