import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/RootBottomTab";
import * as Location from "expo-location";
import WeatherAPI from "./APIs/WeatherAPI";
import fetchONSCode from "./APIs/PostCodesAPI";
import fetchSpecimen from "./APIs/CovidGovAPI";

export default function App() {
  // Getting permission and location from the user
  const [userLocation, setUserLocation] = useState(null);
  const [locationErrorMessage, setLocationErrorMessage] = useState(null);
  const [userONSAreaCode, setUserONSAreaCode] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setLocationErrorMessage("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setUserLocation(currentLocation);
    })();
  }, []);

  // let outcome = "Working on it...";
  // if (locationErrorMessage) {
  //   outcome = locationErrorMessage;
  // } else if (userLocation) {
  //   outcome = JSON.stringify(userLocation);
  // }

  if (userLocation !== null) {
    // TODO: Make it run only once!?
    let latitude = userLocation["coords"].latitude;
    let longitude = userLocation["coords"].longitude;
    console.log("LAT: " + latitude);
    console.log("LON: " + longitude);
    let ONS = fetchONSCode(latitude, longitude);
    ONS.then(function (result) {
      setUserONSAreaCode(result);
      console.log(userONSAreaCode);
      //TODO: Fetch data from GOV.UK COVID API
      // let specimen = fetchSpecimen(userONSAreaCode);
      // specimen.then(function (result) {
      //   console.log(result);
      // });
    });
  }

  //TODO: Send this code to One of the screens!!!

  return (
    <NavigationContainer>
      <Tabs />
      {/* <Text style={{ alignSelf: "center" }}>{userONSAreaCode}</Text> */}
      {/* <WeatherAPI userLocation={userLocation} /> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
