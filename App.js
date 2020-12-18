import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, PermissionsAndroid } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/RootBottomTab";
import * as Location from "expo-location";
import WeatherAPI from "./APIs/WeatherAPI";
import fetchONSCode from "./APIs/PostCodesAPI";
import fetchSpecimen from "./APIs/CovidGovAPI";

export default function App() {
  // Getting permission and location from the user
  const [userLocation, setUserLocation] = useState("Hi");
  const [locationErrorMessage, setLocationErrorMessage] = useState(null);
  const [userONSAreaCode, setUserONSAreaCode] = useState(null);

  // const requestCameraPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: "Location permissions is needed",
  //         message:
  //           "Location is needed to obtain data relevant to you " +
  //           "such as weather forecast and covid status.",
  //         buttonNeutral: "Ask Me Later",
  //         buttonNegative: "Cancel",
  //         buttonPositive: "OK",
  //       }
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log("You can use location");
  //     } else {
  //       console.log("Location permission denied");
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  useEffect(() => {
    let currentLocation = null;
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setLocationErrorMessage("Permission to access location was denied");
        return;
      }

      currentLocation = await Location.getCurrentPositionAsync({});
      console.log(
        "Current location gathered is: " + JSON.stringify(currentLocation)
      );

      if (currentLocation !== null) {
        let latitude = currentLocation["coords"].latitude;
        let longitude = currentLocation["coords"].longitude;
        console.log(
          "LATITUDE_EXTRACTED: " +
            latitude +
            " --- LONGITUDE_EXTRACTED: " +
            longitude
        );

        let ONS = await fetchONSCode(latitude, longitude);
        console.log("ONS code retrieved: " + ONS);

        if (ONS !== null) {
          let specimen = await fetchSpecimen(ONS);
          console.log("Specimen follows next line (COVID API)");
          console.log(specimen);
        }
      }
    })();
  }, []);

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
