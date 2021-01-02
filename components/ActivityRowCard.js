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
import MyModal from "./MyModal";

//TODO: Make a row card that is rendered by a FlatList
const ActivityRowCard = ({
  activityName,
  activityRisk,
  activityBaseRiskValue,
  imagePath,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      underlayColor="#DDD"
      onPress={() => setModalVisible(true)}
    >
      <MyModal
        modalVisible={modalVisible}
        activityBaseRiskValue={activityBaseRiskValue}
        closeModal={() => setModalVisible(false)}
      />
      {/* This view renders each activity view */}
      <View
        style={{
          width: "100%",
          marginTop: 10,
          backgroundColor: "white",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        {/* This view renders the activity image */}
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

        {/* Renders activity name and its risk level */}
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
            {activityName}
          </Text>
          <Text style={{ marginTop: 2, fontSize: 15, alignSelf: "center" }}>
            {activityRisk}
          </Text>

          {/* Showing the right arrow on the card */}
          <View style={{ position: "absolute", end: 5, top: 15 }}>
            <MaterialCommunityIcons
              style={{ alignSelf: "flex-end" }}
              name="arrow-right" // or arrow-right-circle
              color={"#595959"}
              //onPress={() => alert("Opening activiy info")}
              size={24}
            />
          </View>

          {/* Showing the bottom line indicating risk level as a colour */}
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <RiskStatusRectangle
              statusColor="green"
              width={"100%"}
              height={7}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ActivityRowCard;
