import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { ScrollView } from "react-native";
import { Text, View, StyleSheet, Image } from "react-native";
import AppContext from "../components/AppContext";
import MapView from "../components/MapView";
import getCurrentWeather from "../APIs/WeatherAPI";
import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";
import fetchONSCode from "../APIs/PostCodesAPI";
import fetchCovid19Data from "../APIs/CovidGovAPI";

const Dashboard = () => {
  // Getting data from Context
  const myContext = useContext(AppContext);

  // Setting state vars to Covid-19 data from Context
  const [rollingRate100k, setRolling100k] = useState(myContext.covidData[0]);
  const [casesToday, setCasesToday] = useState(myContext.covidData[1]);
  const [cumulativeCases, setCumulativeCases] = useState(myContext.covidData[2]);
  const [areaName, setAreaName] = useState(myContext.covidData[3]);
  const [deathsToday, setDeathsToday] = useState(myContext.covidData[4]);
  const [cumulativeDeaths, setCumulativeDeaths] = useState(myContext.covidData[5]);
  const [nationalCasesToday, setNationalCasesToday] = useState(myContext.covidData[6]);
  const [nationalCumulativeCases, setNationalCumulativeCases] = useState(myContext.covidData[7]);
  const [nationalDeathsToday, setNationalDeathsToday] = useState(myContext.covidData[8]);
  const [nationalCumulativeDeaths, setNationalCumulativeDeaths] = useState(myContext.covidData[9]);

  // Setting state vars to Weather data from Context
  const [currentTemperature, setCurrentTemperature] = useState(myContext.weatherData[0]);
  const [currentFeelsLikeTemp, setCurrentFeelsLikeTemp] = useState(myContext.weatherData[1]);
  const [currentHumidity, setCurrentHumidity] = useState(myContext.weatherData[2]);
  const [currentCondition, setCurrentCondition] = useState(myContext.weatherData[3]);
  const [currentCity, setCurrentCity] = useState(myContext.weatherData[4]);
  const [currentConditionIconCode, setCurrentConditionIconCode] = useState(myContext.weatherData[5]);
  const [currentWindSpeed, setCurrentWindSpeed] = useState(myContext.weatherData[6]);
  let conditionIconURL = {
    uri: `http://openweathermap.org/img/wn/${currentConditionIconCode}@4x.png`,
  };

  /**
   * Component used to display one section of cases and deaths today and overall
   * @param {*} param0
   */
  const SectionRowText = ({ areaName, dailyCases, cumulativeCases, dailyDeaths, cumulativeDeaths }) => {
    return (
      <View style={{ flexDirection: "column", alignItems: "center" }}>
        <Text style={styles.subTitle}>{areaName}</Text>
        <Text style={styles.sectionRowText}>Positive cases today: {dailyCases}</Text>
        <Text style={styles.sectionRowText}>Positive cases overall: {cumulativeCases}</Text>
        <Text style={styles.sectionRowText}>Number of deaths today: {dailyDeaths}</Text>
        <Text style={styles.sectionRowText}>Number of deaths overall: {cumulativeDeaths}</Text>
      </View>
    );
  };

  const ColumnWeatherParameter = ({ parameterName, parameterValue, parameterUnit }) => {
    return (
      <View style={styles.parameterColumn}>
        <Text style={styles.parameterText}>{parameterValue}</Text>
        <Text>{parameterName}</Text>
        <Text>({parameterUnit})</Text>
      </View>
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      updateAPIData();
    }, [])
  );

  /**
   * Updates the existing data gathered from the APIs at app launch, with current data and saves it to context
   */
  async function updateAPIData() {
    let location = await Location.getCurrentPositionAsync({});
    let lat = location.coords.latitude;
    let lon = location.coords.longitude;
    let currentWeather = await getCurrentWeather(lat, lon);

    // Setting weather state vars
    setCurrentTemperature(currentWeather[0]);
    setCurrentFeelsLikeTemp(currentWeather[1]);
    setCurrentHumidity(currentWeather[2]);
    setCurrentCondition(currentWeather[3]);
    setCurrentCity(currentWeather[4]);
    setCurrentConditionIconCode(currentWeather[5]);
    setCurrentWindSpeed(currentWeather[6]);

    let currentONSCode = await fetchONSCode(lat, lon);
    let currentCovidData = await fetchCovid19Data(currentONSCode);

    // Setting Covid state vars
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

    // Update Context
    myContext.userLocation = [lat, lon];
    myContext.ONSCode = currentONSCode;
    myContext.covidData = currentCovidData;
    myContext.weatherData = currentWeather;
  }

  return (
    <ScrollView>
      {/* Top view */}
      <View style={styles.topView}>
        {/* Covid view */}
        <View style={styles.covidView}>
          {/* Covid title */}
          <View style={styles.covidTitleView}>
            <Text style={styles.title}>Covid-19 Stats</Text>
          </View>
          {/* User location statuses */}
          <SectionRowText
            areaName={areaName}
            dailyCases={casesToday}
            cumulativeCases={cumulativeCases}
            dailyDeaths={deathsToday}
            cumulativeDeaths={cumulativeDeaths}
          />
          {/* UK statuses */}
          <SectionRowText
            areaName={"United Kingdom"}
            dailyCases={nationalCasesToday}
            cumulativeCases={nationalCumulativeCases}
            dailyDeaths={nationalDeathsToday}
            cumulativeDeaths={nationalCumulativeDeaths}
          />
          {/* </View> */}
        </View>

        {/* Weather view */}
        <View style={styles.weatherView}>
          <View style={styles.weatherHeading}>
            <Text style={styles.title}>Current weather</Text>
          </View>

          {/* Weather icon and status */}
          <View style={styles.weatherIconAndStatus}>
            <Text style={styles.currentCity}>{currentCity}</Text>
            {/* Icon */}
            <View>
              <Image source={conditionIconURL} style={styles.weatherIcon} />
              <Text style={{ alignSelf: "center", fontSize: 18 }}>{currentCondition}</Text>
            </View>

            {/* Weather statuses */}
            <View
              style={{
                flexDirection: "row",
              }}
            >
              {/* Temperature view */}
              <ColumnWeatherParameter
                parameterName={"Temperature"}
                parameterValue={Math.floor(currentTemperature) + "°"}
                parameterUnit={"°C"}
              />

              {/* Feels like view */}
              <ColumnWeatherParameter
                parameterName={"Feels Like"}
                parameterValue={Math.ceil(currentFeelsLikeTemp) + "°"}
                parameterUnit={"°C"}
              />

              {/* Humidity view */}
              <ColumnWeatherParameter parameterName={"Humidity"} parameterValue={currentHumidity} parameterUnit={"%"} />

              {/* Wind speed view */}
              <ColumnWeatherParameter parameterName={"Wind Speed"} parameterValue={currentWindSpeed} parameterUnit={"m/s"} />
            </View>
          </View>
        </View>
      </View>
      <MapView />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    justifyContent: "space-evenly",
    backgroundColor: "lightgray",
    padding: 10,
  },
  covidView: {
    backgroundColor: "#e5e5e5",
    width: "100%",
    marginTop: 30,
    alignItems: "center",
  },
  covidTitleView: {
    width: "100%",
    backgroundColor: "white",
    padding: 5,
  },
  weatherView: {
    marginTop: 10,
    width: "100%",
  },
  weatherHeading: {
    width: "100%",
    backgroundColor: "white",
    padding: 3,
  },
  weatherIconAndStatus: {
    backgroundColor: "#e5e5e5",
    width: "100%",
    marginBottom: 10,
  },
  currentCity: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 5,
    fontWeight: "bold",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  weatherIcon: {
    height: 60,
    width: 100,
    marginTop: 10,
    marginBottom: 10,
    resizeMode: "cover",
    alignSelf: "center",
  },
  subTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  parameterColumn: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "space-evenly",
    flex: 0.25,
  },
  parameterText: {
    fontSize: 30,
    marginBottom: 10,
  },
  sectionRowText: {
    fontSize: 16,
  },
});

export default Dashboard;
