/**
 * This API is used to retrieve the weather status for the user location
 * from the Open Weather API by using the latitude and longitude provided
 */

const OPEN_WEATHER_KEY = "***REMOVED***";

async function getCurrentWeather(latitude, longitude) {
  try {
    let response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${OPEN_WEATHER_KEY}&units=metric`
    );
    let data = await response.json();
    console.log(data);
    //TODO: Put this in the correct order and change index values in DashBoard context!!!!!
    let currentTemperature = data.main.temp;
    let currentRealFeelTemp = data.main.feels_like;
    let currentHumidity = data.main.humidity;
    let town = data.name;
    let currentCondition = data.weather[0].main;
    let currentCondIcon = data.weather[0].icon;
    let currentWindSpeed = data.wind.speed;
    //console.log(Math.floor(temp));
    //console.log(cond);

    // saving all into an array
    let weatherData = [
      currentTemperature,
      currentRealFeelTemp,
      currentHumidity,
      currentCondition,
      town,
      currentCondIcon,
      currentWindSpeed,
    ];
    return weatherData;
  } catch (error) {
    console.error(error);
  }
}

//TODO: Make another function that gathers FORECASTED weather too.

export default getCurrentWeather;

//TODO: Move this code COMPONENT in another js file, rendering it on the DASHBOARD page to show weather data

// import React, { useState, useEffect } from "react";
// import { StyleSheet, View, Text } from "react-native";

// const WeatherAPI = ({ userLocation }) => {
//   const OPEN_WEATHER_KEY = "***REMOVED***";

//   let latitude = userLocation["coords"].latitude;
//   let longitude = userLocation["coords"].longitude;
//   const [temperature, setTemperature] = useState(null);
//   const [condition, setCondition] = useState(null);

//   console.log("LAT: " + latitude);
//   console.log("LON: " + longitude);

//   async function fetchWeather(latitude, longitude) {
//     try {
//       let response = await fetch(
//         `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${OPEN_WEATHER_KEY}&units=metric`
//       );
//       let data = await response.json();
//       //console.log(data);
//       let temp = data.main.temp;
//       let cond = data.weather[0].main;
//       setTemperature(temp);
//       setCondition(cond);
//       return true;
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   useEffect(() => {
//     (async () => {
//       try {
//         fetchWeather(latitude, longitude);
//       } catch (e) {
//         console.error(e);
//       }
//     })();
//   });

//   return (
//     <View>
//       <Text>HI</Text>
//     </View>
//   );
// };

// export default WeatherAPI;
