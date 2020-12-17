import React, { useState } from "react";
import { Text, View, ActivityIndicator, Button, FlatList } from "react-native";
import MyModal from "../components/MyModal";
import getBeaches from "../APIs/Beach-api";
import ActivityRowCard from "../components/ActivityRowCard";

//TODO: Create Activities screen that is made by different components
const Activities = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [covidData, setCovidData] = useState(getBeaches());
  let userLocation = "?";

  return (
    <View
      style={{
        flex: 1,
        //alignItems: "center",
        //justifyContent: "center",
        backgroundColor: "lightblue",
      }}
    >
      <MyModal
        modalVisible={modalVisible}
        closeModal={() => setModalVisible(false)}
      />

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
            beachName={item.beachName}
            beachStatus={item.beachStatus}
            lifeguarded={item.lifeguarded}
            publicToilets={item.publicToilets}
            parkingAvailability={item.parkingAvailability}
            dogWalking={item.dogWalking}
            cycling={item.cycling}
            bbq={item.bbq}
            warningInfo={item.warningInfo}
            latitude={item.latitude}
            longitude={item.longitude}
            latitudeParking={item.latitudeParking}
            longitudeParking={item.longitudeParking}
            imagePath={item.imagePath}
          />
        )}
      />
    </View>
  );
};

export default Activities;
