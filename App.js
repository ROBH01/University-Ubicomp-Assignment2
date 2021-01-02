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
  const [ONSAreaCode, setONSAreaCode] = useState(null);
  const [specimenData, setSpecimenData] = useState(null);

  // async function updateStateVariables(currentLocation, ONS, currentSpecimen) {
  //   await setUserLocation(currentLocation);
  //   await setONSAreaCode(ONS);
  //   await setSpecimenData(currentSpecimen);
  //   console.log(
  //     "Check if saved in state userLocation: " + JSON.stringify(userLocation)
  //   );
  //   console.log("Check if saved in state ONSAreaCode: " + ONSAreaCode);
  //   console.log(
  //     "Check if saved in state specimenData: " + JSON.stringify(specimenData)
  //   );
  // }

  useEffect(() => {
    let currentLocation = null;
    let ONS = null;
    let specimen = null;

    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setLocationErrorMessage("Permission to access location was denied");
        alert(
          "The application will not work without the permission, please launch the app again and accept if you wish to use the app"
        );
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

        // fetching ONS code from the PostCodes API
        ONS = await fetchONSCode(latitude, longitude);
        console.log("ONS code retrieved: " + ONS);

        specimen = await fetchSpecimen(ONS);
        console.log("Specimen follows next line (COVID API)");
        console.log(specimen);
      }
    })();
  }, []); //this second empty array passed as to execute this useEffect only once!

  return (
    <NavigationContainer>
      <Tabs />
      {/* <Text style={{ alignSelf: "center" }}>{ONSAreaCode}</Text> */}
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
