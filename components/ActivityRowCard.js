import React, { useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RiskStatusRectangle from "./RiskStatusRectangle";

//TODO: Make a row card that is rendered by a FlatList
const ActivityRowCard = ({ beachName, beachStatus, imagePath }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.4}
      underlayColor="#DDD"
      onPress={() => alert("Pressed on " + beachName)}
    >
      {/* This view renders the beach name and the status */}
      <View
        style={{
          width: "100%",
          marginTop: 10,
          backgroundColor: "white",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        {/* This view renders the beach image */}
        <View
          style={{
            width: 150,
            height: 150,
            padding: 5,
            overflow: "hidden",
            backgroundColor: "white",
          }}
        >
          <Image
            borderRadius={5}
            source={imagePath}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <View
          style={{
            backgroundColor: "white",
            flexDirection: "column",
            width: "50%",
            padding: 10,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>{beachName}</Text>
          <Text style={{ marginTop: 5, fontSize: 15 }}>{beachStatus}</Text>

          <View style={{ flexDirection: "row", marginTop: 70 }}>
            <RiskStatusRectangle statusColor="green" width={50} height={10} />
          </View>
        </View>
        <View style={{ alignSelf: "center" }}>
          <MaterialCommunityIcons
            name="arrow-right"
            color={"black"}
            size={30}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ActivityRowCard;
