import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import AppContext from "../components/AppContext";

//TODO: Create Dashboard with counties screen that is made by different components
const Dashboard = () => {
  // getting appcontext COVID and WEATHER data for the dashboard

  // COVID DATA

  // WEATHER DATA
  const myContext = useContext(AppContext);
  console.log(myContext);
  let currentTemperature = myContext.weatherData[0];
  let currentFeelsLike = myContext.weatherData[1];
  let currentHumidity = myContext.weatherData[2];
  let currentCondition = myContext.weatherData[3];
  let currentCity = myContext.weatherData[4];
  let condIconCode = myContext.weatherData[5];
  let currentWindSpeed = myContext.weatherData[6];
  let conditionIconURL = {
    uri: `http://openweathermap.org/img/wn/${condIconCode}@4x.png`,
  };

  // let [timeNow, setTime] = useState(new Date().getSeconds());

  // setInterval(() => {
  //   let date = new Date().getSeconds();
  //   setTime(date);
  //   console.log(date);
  // }, 60000);

  return (
    <View
      style={{
        flex: 1,
        //alignItems: "center",
        justifyContent: "space-around",
        //backgroundColor: "pink",
        margin: 20,
      }}
    >
      {/* Covid view */}
      <View style={{ backgroundColor: "tomato", flex: 0.45, width: "100%" }}>
        <Text style={{ fontSize: 24, textAlign: "center" }}>
          Covid info section
        </Text>
      </View>

      {/* Weather view */}
      <View style={{ flex: 0.45, width: "100%" }}>
        {/* Weather heading */}
        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            padding: 5,
            //height: 40,
          }}
        >
          <Text style={styles.title}>Current weather</Text>
          <Text style={styles.city}>{currentCity}</Text>
          <Text style={styles.date}>TIME?</Text>
        </View>

        {/* Weather status */}
        <View
          style={{
            backgroundColor: "lightgray",
            //height: "100%",
            width: "100%",
          }}
        >
          {/* Icon */}
          <View style={{ height: 100 }}>
            <Image
              source={conditionIconURL}
              style={{
                height: 90,
                width: 140,
                marginTop: 30,
                resizeMode: "cover",
                alignSelf: "center",
              }}
            />
            <Text style={{ alignSelf: "center", fontSize: 18 }}>
              {currentCondition}
            </Text>
          </View>

          {/* Weather status info */}

          <View
            style={{
              flexDirection: "row",
              //backgroundColor: "gray",
              marginTop: 50,
              //height: 100,
              //justifyContent: "space-around",
            }}
          >
            {/* Temperature view */}
            <View
              style={{
                alignItems: "center",
                //backgroundColor: "lightblue",
                marginTop: 20,
                marginBottom: 10,
                justifyContent: "space-evenly",
                flex: 0.25,
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 30, marginBottom: 10 }}
              >
                {Math.floor(currentTemperature)}°
              </Text>
              <Text>Temperature</Text>
              <Text>(°C)</Text>
            </View>

            {/* Feels like view */}
            <View
              style={{
                alignItems: "center",
                //backgroundColor: "lightblue",
                marginTop: 20,
                marginBottom: 10,
                justifyContent: "space-evenly",
                flex: 0.25,
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 30, marginBottom: 10 }}
              >
                {Math.ceil(currentFeelsLike)}°
              </Text>
              <Text>Feels like</Text>
              <Text>(°C)</Text>
            </View>

            {/* Humidity view */}
            <View
              style={{
                alignItems: "center",
                //backgroundColor: "lightblue",
                marginTop: 20,
                marginBottom: 10,
                justifyContent: "space-evenly",
                flex: 0.25,
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 30, marginBottom: 10 }}
              >
                {currentHumidity}
              </Text>
              <Text>Humidity</Text>
              <Text>(%)</Text>
            </View>

            {/* Wind speed view */}
            <View
              style={{
                alignItems: "center",
                //backgroundColor: "lightblue",
                marginTop: 20,
                justifyContent: "space-evenly",
                marginBottom: 10,
                flex: 0.25,
              }}
            >
              {/* TODO: Make a new View as Component that simplifies this! Takes in params e.g. style and vars e.g. windspeed, so all views are same but no repetition*/}
              <Text
                style={{ fontWeight: "bold", fontSize: 30, marginBottom: 10 }}
              >
                {currentWindSpeed}
              </Text>
              <Text>Wind Speed</Text>
              <Text>(m/s)</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  //TODO: Refactor this: check previous exercises, I can override one property e.g. fontsize only from a common style values
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  city: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 2,
  },
  date: {
    textAlign: "center",
    marginTop: 2,
  },
});

export default Dashboard;
