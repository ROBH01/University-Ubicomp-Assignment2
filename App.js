import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/RootBottomTab";
import AppContext from "./components/AppContext";
import * as Location from "expo-location";
import getCurrentWeather from "./APIs/WeatherAPI";
import fetchONSCode from "./APIs/PostCodesAPI";
import fetchRolling100k from "./APIs/CovidGovAPI";

export default function App() {
  // Getting permission and location from the user
  const [userLocation, setUserLocation] = useState(null);
  // const [userLocationErrMessage, setUserLocationErrMessage] = useState(null);
  const [ONSAreaCode, setONSAreaCode] = useState(null);
  const [rollingRate100k, setRollingRate100k] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  let stateVarsUpdatedFlag = false;

  useEffect(() => {
    let currentLocation = null;
    let ONSCode = null;
    let rolling100k = null;
    let weatherData = null;

    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        // setUserLocationErrMessage("Permission to access location was denied");
        alert(
          "The application will not work without the permission, please launch the app again and accept if you wish to use the app"
        );
        return;
      }

      currentLocation = await Location.getCurrentPositionAsync({});
      // console.log(
      //   "Current location gathered is: " + JSON.stringify(currentLocation)
      // );

      if (currentLocation !== null) {
        let latitude = currentLocation["coords"].latitude;
        let longitude = currentLocation["coords"].longitude;
        let latitudeLongitude = [latitude, longitude];
        //console.log(latitudeLongitude);
        // console.log(
        //   "LATITUDE_EXTRACTED: " +
        //     latitude +
        //     " --- LONGITUDE_EXTRACTED: " +
        //     longitude
        // );

        // fetching ONSCode code from the PostCodes API
        ONSCode = await fetchONSCode(latitude, longitude);
        if (ONSCode !== null) {
          // fetching the rate per 100k population from GOV.co.uk API
          rolling100k = await fetchRolling100k(ONSCode);
          if (rolling100k !== null) {
            // fetching current weather data from Open Weather API
            weatherData = await getCurrentWeather(latitude, longitude);
            if (!stateVarsUpdatedFlag) {
              // save API data into state variables
              setUserLocation(latitudeLongitude);
              setONSAreaCode(ONSCode);
              setRollingRate100k(rolling100k);
              setWeatherData(weatherData);
              stateVarsUpdatedFlag = true;
            }
          }
        }
      }
    })();
  }, []); // this second empty array: }, []);, passed as to execute this useEffect only once! without will run once but runs 4 times??

  // console.log("a" + userLocation);
  // console.log("b" + ONSAreaCode);
  // console.log("c" + rollingRate100k);
  // console.log("d" + weatherData);

  // saving all in AppContext
  let APIData = {
    userLocation: userLocation,
    ONSCode: ONSAreaCode,
    rollingRate100k: rollingRate100k,
    weatherData: weatherData,
  };

  return (
    <AppContext.Provider value={APIData}>
      <NavigationContainer>
        <Tabs />
        {/* <Text style={{ alignSelf: "center" }}>{ONSAreaCode}</Text> */}
        {/* <WeatherAPI userLocation={userLocation} /> */}
      </NavigationContainer>
    </AppContext.Provider>
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
