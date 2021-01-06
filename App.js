import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/RootBottomTab";
import AppContext from "./components/AppContext";
import * as Location from "expo-location";
import getCurrentWeather from "./APIs/WeatherAPI";
import fetchONSCode from "./APIs/PostCodesAPI";
import fetchRolling100k from "./APIs/CovidGovAPI";
import UserRegistration from "./screens/UserRegistration";
import { AsyncStorageController } from "./APIs/AsyncStorage";

export default function App() {
  // AsyncStorage keys
  const USERNAME_KEY = "@name";
  const USERAGE_KEY = "@age";
  const USERCONDITION_KEY = "@condition";

  // Getting permission and location from the user
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userUnderlyingHealthCond, setUserUnderlyingHealthCond] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showRegistration, setShowIntro] = useState(false);
  // const [userLocationErrMessage, setUserLocationErrMessage] = useState(null);
  const [ONSAreaCode, setONSAreaCode] = useState(null);
  const [rollingRate100k, setRollingRate100k] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  let stateVarsUpdatedFlag = false;

  // functions to handle walk in screen
  const walkInCompleted = () => {
    // save user data to context
    console.log("USERNAME CHANGING INTRO: " + userName);
    console.log("AGE CHANGING INTRO: " + userAge);
    console.log(
      "UNDERLAYING CONDITION? CHANGING INTRO: " + userUnderlyingHealthCond
    );
    // show main app
    setShowIntro(false);
  };

  useEffect(() => {
    let currentLocation = null;
    let ONSCode = null;
    let rolling100k = null;
    let weatherData = null;

    //TODO: First of all: MAKE SURE USER HAS INTERNET CONNECTION, IF NOT RESTART APP

    (async () => {
      //TODO: get data from the user from the database!!! IF THERE IS DATA, USER ALREADY REGISTERED, setShowIntro(false)
      let user = await AsyncStorageController.readData(USERNAME_KEY);
      let age = await AsyncStorageController.readData(USERAGE_KEY);
      let condition = await AsyncStorageController.readData(USERCONDITION_KEY);

      if (user !== null) {
        setUserName(user);
        setUserAge(age);
        console.log(condition);
        setUserUnderlyingHealthCond(condition === "true");
        setShowIntro(false);
        setIsLoading(false);
      } else {
        setShowIntro(true);
        setIsLoading(false);
      }
      //AsyncStorageController.clearStorage(); //FIXME:

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
  //console.log(userName);

  // show walk in screen if first time

  // saving all in AppContext
  let APIData = {
    userLocation: userLocation,
    ONSCode: ONSAreaCode,
    rollingRate100k: rollingRate100k,
    weatherData: weatherData,
    userName: userName,
    userAge: userAge,
    userUnderlyingHealthCond: userUnderlyingHealthCond,
    username_key: USERNAME_KEY,
    userage_key: USERAGE_KEY,
    usercondition_key: USERCONDITION_KEY,
    shouldUpdate: false,
  };

  console.log(APIData);

  if (isLoading || APIData.weatherData === null) {
    return (
      <View style={{ width: "100%", height: "100%", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  if (showRegistration) {
    return (
      <UserRegistration
        title={"User details"}
        text={
          "Please provide the following details to have a more personalised experience"
        }
        buttonName={"Done"}
        completed={walkInCompleted}
        userName={userName}
        setUserName={(username) => setUserName(username)}
        userAge={userAge}
        setUserAge={(age) => setUserAge(age)}
        userUnderlyingHealthCond={userUnderlyingHealthCond}
        setUserUnderlyingHealthCond={(underlyingCondition) =>
          setUserUnderlyingHealthCond(underlyingCondition)
        }
      />
    );
  }

  //console.log("USER TO SAVE: " + userName);
  AsyncStorageController.saveData(USERNAME_KEY, userName);
  AsyncStorageController.saveData(USERAGE_KEY, userAge);
  AsyncStorageController.saveData(
    USERCONDITION_KEY,
    userUnderlyingHealthCond + ""
  );
  //let value = AsyncStorageController.readData(USERNAME_KEY);
  //console.log(value);
  // console.log(userName);
  // console.log(userUnderlyingHealthCond);
  // console.log(userAge);

  // show main app
  return (
    <AppContext.Provider value={APIData}>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </AppContext.Provider>
  );
}
