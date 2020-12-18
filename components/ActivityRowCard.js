import React, { useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  Button,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RiskStatusRectangle from "./RiskStatusRectangle";

//TODO: Make a row card that is rendered by a FlatList
const ActivityRowCard = ({ beachName, beachStatus, imagePath }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      underlayColor="#DDD"
      onPress={() => alert("Pressed on " + beachName)}
    >
      {/* This view renders the beach name and the status */}
      <View
        style={{
          width: "100%",
          marginTop: 10,
          backgroundColor: "white",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        {/* This view renders the beach image */}
        <View
          style={{
            width: "100%",
            height: 140,
            //padding: 5,
            overflow: "hidden",
            backgroundColor: "white",
          }}
        >
          <ImageBackground
            //borderRadius={5}
            source={imagePath}
            style={{ width: "100%", height: "100%" }}
          >
            {/* <View>
              <MaterialCommunityIcons
                style={{ position: "absolute", alignSelf: "flex-end", top: 70 }}
                name="arrow-right-circle"
                raised
                color={"white"}
                onPress={() => alert("Opening activiy info")}
                size={34}
              />
            </View> */}
          </ImageBackground>
        </View>

        {/* Other */}
        <View
          style={{
            backgroundColor: "white",
            flexDirection: "column",
            width: "100%",
            //padding: 10,
          }}
        >
          <Text
            style={{
              marginTop: 2,
              fontWeight: "bold",
              fontSize: 18,
              alignSelf: "center",
            }}
          >
            {beachName}
          </Text>
          <View style={{ flexDirection: "row", backgroundColor: "pink" }}>
            <View style={{ width: "90%" }}>
              <Text style={{ marginTop: 5, fontSize: 15, alignSelf: "center" }}>
                {beachStatus}
              </Text>
            </View>

            {/* <MaterialCommunityIcons
              style={{ alignSelf: "flex-end" }}
              name="arrow-right-circle"
              raised
              color={"black"}
              onPress={() => alert("Opening activiy info")}
              size={24}
            /> */}
          </View>

          <View style={{ flexDirection: "row", marginTop: 2 }}>
            <RiskStatusRectangle
              statusColor="green"
              width={"100%"}
              height={6}
            />
          </View>

          {/* <View style={{ alignSelf: "center" }}>
            <MaterialCommunityIcons
              name="arrow-right"
              color={"black"}
              size={30}
            />
          </View> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ActivityRowCard;
