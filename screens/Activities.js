import React, { useState } from "react";
import { Text, View, ActivityIndicator, Button, FlatList } from "react-native";
import getActivities from "../APIs/Activities-api";
import ActivityRowCard from "../components/ActivityRowCard";

//TODO: Create Activities screen that is made by different components
const Activities = () => {
  const [covidData, setCovidData] = useState(getActivities());
  let userLocation = "?";

  return (
    <View
      style={{
        flex: 1,
        //alignItems: "center",
        //justifyContent: "center",
        backgroundColor: "lightgray",
      }}
    >
      {/* This is the loading part */}
      {/* <ActivityIndicator size="large" color="#000" /> */}

      {/* <Text style={{ fontSize: 24 }}>Activities screen</Text> */}
      {/* <Button title="Toggle modal" onPress={() => setModalVisible(true)} />
      <Text>Hi, your location is: {userLocation}</Text> */}
      <Text style={{ fontSize: 26, alignSelf: "center", marginTop: 40 }}>
        Add new activity
      </Text>
      {/* Starting FlatList from here! */}
      <FlatList
        data={covidData}
        style={{
          marginLeft: 10,
          marginRight: 10,
          marginTop: 20,
          marginBottom: 10,
          //backgroundColor: "blue",
        }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ActivityRowCard
            activityName={item.activityName}
            activityRisk={item.activityRisk}
            activityBaseRiskValue={item.activityBaseRiskValue}
            imagePath={item.imagePath}
          />
        )}
      />
    </View>
  );
};

export default Activities;
