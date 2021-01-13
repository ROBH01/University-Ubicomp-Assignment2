import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/RootBottomTab";
import AppContext from "./components/AppContext";
import * as Location from "expo-location";
import getCurrentWeather from "./APIs/WeatherAPI";
import fetchONSCode from "./APIs/PostCodesAPI";
import fetchCovid19Data from "./APIs/CovidGovAPI";
import UserRegistration from "./screens/UserRegistration";
import { AsyncStorageController } from "./APIs/AsyncStorage";
import color from "./assets/colors";

export default function App() {
  // AsyncStorage keys
  const USER_NAME_KEY = "@name";
  const USER_AGE_KEY = "@age";
  const USER_CONDITION_KEY = "@condition";

  // User and API state vars
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userUnderlyingHealthCond, setUserUnderlyingHealthCond] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [showUserRegistration, setShowUserRegistration] = useState(false);
  const [ONSAreaCode, setONSAreaCode] = useState(null);
  const [covidData, setCovidData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  let stateVarsUpdatedFlag = false;

  useEffect(() => {
    let tempCurrentLocation = null;
    let tempONSCode = null;
    let tempCovidData = null;
    let tempWeatherData = null;

    (async () => {
      // Checking if there is user information stored as to confirm if this is the first launch or not
      let user = await AsyncStorageController.readData(USER_NAME_KEY);
      let age = await AsyncStorageController.readData(USER_AGE_KEY);
      let condition = await AsyncStorageController.readData(USER_CONDITION_KEY);

      if (user !== null || age !== null || condition !== null) {
        setUserName(user);
        setUserAge(age);
        setUserUnderlyingHealthCond(condition === "true"); // converting back to boolean as AsyncStorage deals with strings
        setShowUserRegistration(false);
        setIsAppLoading(false);
      } else {
        setShowUserRegistration(true);
        setIsAppLoading(false);
      }

      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        alert("The application will not work without the permission, please launch the app again and accept if you wish to use the app");
        return;
      }
      // Getting user current location
      tempCurrentLocation = await Location.getCurrentPositionAsync({});
      if (tempCurrentLocation !== null) {
        let latitude = tempCurrentLocation["coords"].latitude;
        let longitude = tempCurrentLocation["coords"].longitude;
        let latitudeLongitude = [latitude, longitude];

        // Starting on fething the data from the APIs
        tempONSCode = await fetchONSCode(latitude, longitude);
        if (tempONSCode !== null) {
          tempCovidData = await fetchCovid19Data(tempONSCode);
          if (tempCovidData !== null) {
            tempWeatherData = await getCurrentWeather(latitude, longitude);
            if (!stateVarsUpdatedFlag) {
              // Saving all the data in the state vars
              setUserLocation(latitudeLongitude);
              setONSAreaCode(tempONSCode);
              setCovidData(tempCovidData);
              setWeatherData(tempWeatherData);
              stateVarsUpdatedFlag = true;
            }
          }
        }
      }
    })();
  }, []);

  // Saving data in the AppContext
  let APIData = {
    userLocation: userLocation,
    ONSCode: ONSAreaCode,
    covidData: covidData,
    weatherData: weatherData,
    userName: userName,
    userAge: userAge,
    userUnderlyingHealthCond: userUnderlyingHealthCond,
    USER_NAME_KEY: USER_NAME_KEY,
    USER_AGE_KEY: USER_AGE_KEY,
    USER_CONDITION_KEY: USER_CONDITION_KEY,
  };

  // Show a loader if the app is loading and the data is not fetched yet
  if (isAppLoading || APIData.weatherData === null) {
    return (
      <View style={{ width: "100%", height: "100%", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={color.lightBlue} />
      </View>
    );
  }

  // Show the registration screen if first launch
  if (showUserRegistration) {
    return (
      <UserRegistration
        title={"User details"}
        subtitle={"Please provide the following details to have a more personalised experience"}
        buttonName={"Done"}
        onCompleted={() => setShowUserRegistration(false)}
        newUserName={userName}
        setNewUserName={(username) => setUserName(username)}
        newUserAge={userAge}
        setNewUserAge={(age) => setUserAge(age)}
        newUserUnderlyingHealthCond={userUnderlyingHealthCond}
        setNewUserUnderlyingHealthCond={(underlyingCondition) => setUserUnderlyingHealthCond(underlyingCondition)}
      />
    );
  }

  // Save the data that the user has typed in on local storage
  AsyncStorageController.saveData(USER_NAME_KEY, userName);
  AsyncStorageController.saveData(USER_AGE_KEY, userAge);
  AsyncStorageController.saveData(USER_CONDITION_KEY, userUnderlyingHealthCond + "");

  // Show the main app
  return (
    <AppContext.Provider value={APIData}>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </AppContext.Provider>
  );
}
