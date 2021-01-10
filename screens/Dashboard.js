import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { ScrollView } from "react-native";
import { Text, View, StyleSheet, Image } from "react-native";
import AppContext from "../components/AppContext";

//TODO: Create Dashboard with counties screen that is made by different components
const Dashboard = () => {
  // getting appcontext COVID and WEATHER data for the dashboard
  const myContext = useContext(AppContext);
  console.log(myContext);

  // COVID DATA
  let dailyCases = myContext.covidData[1];
  let cumulativeCases = myContext.covidData[2];
  let areaName = myContext.covidData[3];
  let dailyDeaths = myContext.covidData[4];
  let cumulativeDeaths = myContext.covidData[5];
  let dailyNationalCases = myContext.covidData[6];
  let cumulativeNationalCases = myContext.covidData[7];
  let dailyNationalDeaths = myContext.covidData[8];
  let cumulativeNationalDeaths = myContext.covidData[9];
  let resultsDate = myContext.covidData[10]; //TODO: CHECK IN THE MORNING TO SEE IF THERE IS VALUES!

  // WEATHER DATA
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

  const SectionRowText = ({
    areaName,
    dailyCases,
    cumulativeCases,
    dailyDeaths,
    cumulativeDeaths,
  }) => {
    return (
      <View style={{ flexDirection: "column", alignItems: "center" }}>
        <Text style={styles.subTitle}>{areaName}</Text>
        <Text style={{ fontSize: 16 }}>Positive cases today: {dailyCases}</Text>
        <Text style={{ fontSize: 16 }}>
          Positive cases overall: {cumulativeCases}
        </Text>
        <Text style={{ fontSize: 16 }}>
          Number of deaths today: {dailyDeaths}
        </Text>
        <Text style={{ fontSize: 16 }}>
          Number of deaths overall: {cumulativeDeaths}
        </Text>
      </View>
    );
  };

  // let [timeNow, setTime] = useState(new Date().getSeconds());

  // setInterval(() => {
  //   let date = new Date().getSeconds();
  //   setTime(date);
  //   console.log(date);
  // }, 60000);

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          //alignItems: "center",
          justifyContent: "space-evenly",
          backgroundColor: "lightgray",
          padding: 10,
          //padding: 5,
          //marginTop: 50,
        }}
      >
        {/* Covid view */}
        <View
          style={{
            backgroundColor: "#e5e5e5",
            //flex: 0.4,
            width: "100%",
            //padding: 5,
            marginTop: 30,
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "100%",
              backgroundColor: "white",
              padding: 5,
              //height: 40,
            }}
          >
            <Text style={styles.title}>Covid-19 Stats</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
              //height: "70%",
              marginBottom: 10,
            }}
          >
            <SectionRowText
              areaName={areaName}
              dailyCases={dailyCases}
              cumulativeCases={cumulativeCases}
              dailyDeaths={dailyDeaths}
              cumulativeDeaths={cumulativeDeaths}
            />
            <SectionRowText
              areaName={"United Kingdom"}
              dailyCases={dailyNationalCases}
              cumulativeCases={cumulativeNationalCases}
              dailyDeaths={dailyNationalDeaths}
              cumulativeDeaths={cumulativeNationalDeaths}
            />
          </View>
        </View>

        {/* Weather view */}
        <View style={{ marginTop: 10, width: "100%" }}>
          {/* Weather heading */}
          <View
            style={{
              width: "100%",
              backgroundColor: "white",
              padding: 3,
              //height: 40,
            }}
          >
            <Text style={styles.title}>Current weather</Text>
          </View>

          {/* Weather icon and status */}
          <View
            style={{
              backgroundColor: "#e5e5e5",
              //height: "100%",
              width: "100%",
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                marginTop: 5,
                fontWeight: "bold",
              }}
            >
              {currentCity}
            </Text>
            {/* Icon */}
            <View>
              <Image
                source={conditionIconURL}
                style={{
                  height: 60,
                  width: 100,
                  marginTop: 10,
                  marginBottom: 10,
                  resizeMode: "cover",
                  alignSelf: "center",
                }}
              />
              <Text style={{ alignSelf: "center", fontSize: 18 }}>
                {currentCondition}
              </Text>
            </View>

            {/* Weather status */}
            <View
              style={{
                flexDirection: "row",
                //backgroundColor: "gray",
                //marginTop: 50,
                //height: 100,
                //justifyContent: "space-around",
              }}
            >
              {/* Temperature view */}
              <View
                style={{
                  alignItems: "center",
                  //backgroundColor: "lightblue",
                  marginTop: 10,
                  marginBottom: 10,
                  justifyContent: "space-evenly",
                  flex: 0.25,
                }}
              >
                <Text style={{ fontSize: 30, marginBottom: 10 }}>
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
                  marginTop: 10,
                  marginBottom: 10,
                  justifyContent: "space-evenly",
                  flex: 0.25,
                }}
              >
                <Text style={{ fontSize: 30, marginBottom: 10 }}>
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
                  marginTop: 10,
                  marginBottom: 10,
                  justifyContent: "space-evenly",
                  flex: 0.25,
                }}
              >
                <Text style={{ fontSize: 30, marginBottom: 10 }}>
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
                  marginTop: 10,
                  justifyContent: "space-evenly",
                  marginBottom: 10,
                  flex: 0.25,
                }}
              >
                {/* TODO: Make a new View as Component that simplifies this! Takes in params e.g. style and vars e.g. windspeed, so all views are same but no repetition*/}
                <Text style={{ fontSize: 30, marginBottom: 10 }}>
                  {currentWindSpeed}
                </Text>
                <Text>Wind Speed</Text>
                <Text>(m/s)</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  //TODO: Refactor this: check previous exercises, I can override one property e.g. fontsize only from a common style values
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  subTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
});

export default Dashboard;
