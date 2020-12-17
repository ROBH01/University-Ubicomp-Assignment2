import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

//TODO: Maybe component not needed, call from App directly this file to run the function only!!!! e.g. export function that returns the data
const WeatherAPI = ({ userLocation }) => {
  const OPEN_WEATHER_KEY = "***REMOVED***";

  let latitude = userLocation["coords"].latitude;
  let longitude = userLocation["coords"].longitude;
  const [temperature, setTemperature] = useState(null);
  const [condition, setCondition] = useState(null);

  console.log("LAT: " + latitude);
  console.log("LON: " + longitude);

  async function fetchWeather(latitude, longitude) {
    try {
      //TODO: Replace with actual FORECAST INSTEAD of weather now.
      let response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${OPEN_WEATHER_KEY}&units=metric`
      );
      let data = await response.json();
      //console.log(data);
      let temp = data.main.temp;
      let cond = data.weather[0].main;
      setTemperature(temp);
      setCondition(cond);
      return true;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        fetchWeather(latitude, longitude);
      } catch (e) {
        console.error(e);
      }
    })();
  });

  return (
    <View>
      <Text>HI</Text>
    </View>
  );
};

export default WeatherAPI;
