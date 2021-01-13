import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { ScrollView } from "react-native";
import { Button } from "react-native";
import { Text, View, StyleSheet, Image } from "react-native";
import AppContext from "../components/AppContext";
import MapView from "../components/MapView";
import getCurrentWeather from "../APIs/WeatherAPI";
import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";
import fetchONSCode from "../APIs/PostCodesAPI";
import fetchCovid19Data from "../APIs/CovidGovAPI";

//TODO: Create Dashboard with counties screen that is made by different components
const Dashboard = () => {
  // getting appcontext COVID and WEATHER data for the dashboard
  const myContext = useContext(AppContext);
  console.log(myContext);

  // COVID DATA
  // TODO: DON T FORGET TO ADD THIS TO CONTEXT AS WELL AS UPDATING IT!!!!!!!
  // let rollingRate100k = myContext.covidData[0];
  const [rollingRate100k, setRolling100k] = useState(myContext.covidData[0]);
  const [casesToday, setCasesToday] = useState(myContext.covidData[1]);
  const [cumulativeCases, setCumulativeCases] = useState(
    myContext.covidData[2]
  );
  const [areaName, setAreaName] = useState(myContext.covidData[3]);
  const [deathsToday, setDeathsToday] = useState(myContext.covidData[4]);
  const [cumulativeDeaths, setCumulativeDeaths] = useState(
    myContext.covidData[5]
  );
  const [nationalCasesToday, setNationalCasesToday] = useState(
    myContext.covidData[6]
  );
  const [nationalCumulativeCases, setNationalCumulativeCases] = useState(
    myContext.covidData[7]
  );
  const [nationalDeathsToday, setNationalDeathsToday] = useState(
    myContext.covidData[8]
  );
  const [nationalCumulativeDeaths, setNationalCumulativeDeaths] = useState(
    myContext.covidData[9]
  );

  // WEATHER DATA
  //let currentTemperature = myContext.weatherData[0];
  const [currT, setCurrT] = useState(myContext.weatherData[0]);
  const [currFeelLikeTemp, setCurrFeelLikeTemp] = useState(
    myContext.weatherData[1]
  );
  const [currHumidity, setCurrentHumidity] = useState(myContext.weatherData[2]);
  const [currCondition, setCurrCondition] = useState(myContext.weatherData[3]);
  const [currCity, setCurrCity] = useState(myContext.weatherData[4]);
  const [conditionIconCode, setConditionIconCode] = useState(
    myContext.weatherData[5]
  );
  const [currWindSpeed, setCurrWindSpeed] = useState(myContext.weatherData[6]);
  let conditionIconURL = {
    uri: `http://openweathermap.org/img/wn/${conditionIconCode}@4x.png`,
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

  useFocusEffect(
    React.useCallback(() => {
      updateAPIData();
    }, [])
  );

  // Updates the existing data from the APIs gathered at app launch with current ones and saves it to context
  async function updateAPIData() {
    let location = await Location.getCurrentPositionAsync({});
    //console.log("NEXTTTTTTTTT: ");
    let lat = location.coords.latitude;
    let lon = location.coords.longitude;
    //console.log(location.coords.latitude);
    let currentWeather = await getCurrentWeather(lat, lon);
    //console.log("WOW WORKS: ");
    //console.log(newWeather);
    setCurrT(currentWeather[0]);
    setCurrFeelLikeTemp(currentWeather[1]);
    setCurrentHumidity(currentWeather[2]);
    setCurrCondition(currentWeather[3]);
    setCurrCity(currentWeather[4]);
    setConditionIconCode(currentWeather[5]);
    setCurrWindSpeed(currentWeather[6]);

    let currentONSCode = await fetchONSCode(lat, lon);
    //console.log("ONS?????????????");
    //console.log(currentONSCode);

    let currentCovidData = await fetchCovid19Data(currentONSCode);
    //console.log("NEW COVID: ");
    //console.log(currentCovidData);

    setRolling100k(currentCovidData[0]);
    setCasesToday(currentCovidData[1]);
    setCumulativeCases(currentCovidData[2]);
    setAreaName(currentCovidData[3]);
    setDeathsToday(currentCovidData[4]);
    setCumulativeDeaths(currentCovidData[5]);
    setNationalCasesToday(currentCovidData[6]);
    setNationalCumulativeCases(currentCovidData[7]);
    setNationalDeathsToday(currentCovidData[8]);
    setNationalCumulativeDeaths(currentCovidData[9]);

    // update in the context
    myContext.userLocation = [lat, lon];
    myContext.ONSCode = currentONSCode;
    myContext.covidData = currentCovidData;
    myContext.weatherData = currentWeather;

    // console.log("AAAAAAAAAAAAAAAAAAAA");
    // console.log(myContext);
  }

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
              dailyCases={casesToday}
              cumulativeCases={cumulativeCases}
              dailyDeaths={deathsToday}
              cumulativeDeaths={cumulativeDeaths}
            />
            <SectionRowText
              areaName={"United Kingdom"}
              dailyCases={nationalCasesToday}
              cumulativeCases={nationalCumulativeCases}
              dailyDeaths={nationalDeathsToday}
              cumulativeDeaths={nationalCumulativeDeaths}
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
              {currCity}
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
                {currCondition}
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
                  {Math.floor(currT)}°
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
                  {Math.ceil(currFeelLikeTemp)}°
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
                  {currHumidity}
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
                  {currWindSpeed}
                </Text>
                <Text>Wind Speed</Text>
                <Text>(m/s)</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <MapView />
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
