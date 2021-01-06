import React, { useState } from "react";
import { useEffect } from "react";
import { Text, View, Button, FlatList } from "react-native";
import getActivities from "../APIs/Activities-api";
import ActivityRowCard from "../components/ActivityRowCard";
////
import AppContext from "../components/AppContext";
import { useContext } from "react";

//TODO: Create Activities screen that is made by different components
const Activities = () => {
  //TODO: Use the following state if want to add extra activities by the user!
  //const [activities, setActivities] = useState(getActivities());

  // function refreshData() {
  //   //TODO: Implement refreshing
  //   alert("Refreshed");
  // }

  return (
    <View
      style={{
        flex: 1,
        //alignItems: "center",
        //justifyContent: "center",
        backgroundColor: "lightgray",
      }}
    >
      {/* <Text style={{ fontSize: 24 }}>Activities screen</Text> */}
      {/* <Button title="Toggle modal" onPress={() => setModalVisible(true)} />
      <Text>Hi, your location is: {userLocation}</Text> */}
      {/* <Text style={{ fontSize: 26, alignSelf: "center", marginTop: 40 }}>
        Add new activity
      </Text> */}
      {/* Starting FlatList from here! */}
      <FlatList
        data={getActivities()}
        style={{
          marginLeft: 5,
          marginRight: 5,
          marginTop: 40,
          //backgroundColor: "blue",
        }}
        //refreshing={??}
        //onRefresh={refreshData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ActivityRowCard
            activityName={item.activityName}
            activityRiskLabel={item.activityRiskLabel}
            activityBaseRiskValue={item.activityBaseRiskValue}
            activityType={item.activityType}
            imagePath={item.imagePath}
          />
        )}
      />
    </View>
  );
};

export default Activities;
