import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/RootBottomTab";
import AppContext from "./components/AppContext";
import * as Location from "expo-location";
import getCurrentWeather from "./APIs/WeatherAPI";
import fetchONSCode from "./APIs/PostCodesAPI";
import fetchRolling100k from "./APIs/CovidGovAPI";
import AppIntroSlider from "react-native-app-intro-slider";
import CustomTextInput from "./components/CustomTextInput";
import LabeledSwitch from "react-native-custom-switches/LabeledSwitch";
import UserRegistration from "./screens/UserRegistration";

export default function App() {
  // Getting permission and location from the user
  // const [userName, setUserName] = useState(null);
  // const [userAge, setUserAge] = useState(null);
  // const [userUnderlayingHealthCond, setUserUnderlayingHealthCond] = useState(
  //   false
  // );
  const [userLocation, setUserLocation] = useState(null);
  const [showIntro, setShowIntro] = useState(false);
  // const [userLocationErrMessage, setUserLocationErrMessage] = useState(null);
  const [ONSAreaCode, setONSAreaCode] = useState(null);
  const [rollingRate100k, setRollingRate100k] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  let stateVarsUpdatedFlag = false;

  // functions to handle walk in screen
  const walkInCompleted = () => {
    setShowIntro(false);
  };

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          backgroundColor: item.backgroundColor,
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Text style={{ alignSelf: "center", fontSize: 24, color: "white" }}>
          {item.title}
        </Text>
        <Text
          style={{
            alignSelf: "center",
            fontSize: 16,
            color: "white",
            textAlign: "center",
          }}
        >
          {item.text}
        </Text>

        <CustomTextInput
          marginTop={20}
          height={30}
          width={"60%"}
          backgroundColor={"white"}
          alignSelf={"center"}
          textAlign={"center"}
          placeholder={"Enter name"}
          onChangeText={(name) => setUserName(name)}
          maxLength={16}
        />

        <CustomTextInput
          marginTop={20}
          height={30}
          width={"60%"}
          backgroundColor={"white"}
          alignSelf={"center"}
          textAlign={"center"}
          placeholder={"Enter age"}
          onChangeText={(age) => setUserAge(age)}
          maxLength={16}
        />

        <View
          style={{ alignSelf: "center", marginTop: 20, alignItems: "center" }}
        >
          <Text style={{ color: "white", marginBottom: 10 }}>
            Do you have any underlying health conditions?
          </Text>
          <LabeledSwitch
            value={userUnderlayingHealthCond}
            onChange={
              userUnderlayingHealthCond
                ? () => setUserUnderlayingHealthCond(false)
                : () => setUserUnderlayingHealthCond(true)
            }
            disabledColor="#e63111"
            enabledColor="#008000"
            disabledLabel="No"
            enabledLabel="Yes"
            width={90}
          />
        </View>
      </View>
    );
  };

  const slides = [
    // {
    //   key: "1",
    //   title: "Explain how the app works",
    //   text: "Best ecommerce in the world",
    //   backgroundColor: "#F7BB64",
    // },
    {
      key: "2",
      title: "Personal details",
      text:
        "Provide the following details to have a more personalised experience",
      backgroundColor: "#2196F3",
    },
  ];

  useEffect(() => {
    let currentLocation = null;
    let ONSCode = null;
    let rolling100k = null;
    let weatherData = null;

    //TODO: get data from the user from the database!!! IF THERE IS DATA, USER ALREADY REGISTERED, setShowIntro(false)

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

  // show walk in screen
  if (showIntro) {
    return <UserRegistration completed={() => setShowIntro(false)} />;
  }

  // show main app
  // console.log(userName);
  // console.log(userUnderlayingHealthCond);
  // console.log(userAge);

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
