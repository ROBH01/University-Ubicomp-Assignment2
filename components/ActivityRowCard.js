import React, { useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  Button,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RiskStatusRectangle from "./RiskStatusRectangle";
import MyModal from "./MyModal";
import colors from "../assets/colors";
import constants from "./Constants";
//
import AppContext from "./AppContext";
import { useContext } from "react";

//TODO: Make a row card that is rendered by a FlatList
const ActivityRowCard = ({
  activityName,
  activityRiskLabel,
  activityBaseRiskValue,
  activityType,
  imagePath,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  /**STARTING
   * WORKING OUT
   * CALCULATIONS ABOUT
   * THIS ACTIVITY
   */

  // getting apis data from context
  const myContext = useContext(AppContext);
  //console.log(myContext);

  //FIXME: IF CHANGE DETAILS IN USER SCREEN, CHANGE IS NOT HAPPENING STRAIGHT AWAY IN ACTIVITIES LINE COLOUR, ONLY AFTER CLICKING ON EACH OR REFRESHES!!!

  // const [activityFeedback, setActivityFeedback] = useState(""); not allowing me, too many re-renders :(
  let activityFeedback = "";
  let activityRiskLevel = null;

  //TODO: Make a function that is called to check weather predictions, and return appropriate feedback.
  function isBadWeather() {
    // if rain or snow is forecast, add BAD_WEATHER_FORECAST to LOW_RISK_FORMAT:
    // if real feel temp is less than 3 degrees, add VERY_LOW_TEMP to LOW_RISK_FORMAT:
  }

  // TODO: Check user age and add as factor in risk!

  //TODO: Make a function that calculates how much to add on top of an activity based on covid data and weather forecast?
  const buildFeedback = () => {
    //let activityFeedback = "";

    // check covid status of the area (utla rates taken and adjusted from: https://coronavirus.data.gov.uk/details/interactive-map)
    // get area rolling rate x 100k
    //FIXME: THIS IS FOR DEMO ONLY TESTING WITHOUT APIs
    //let rollingRate100k = 900; // ideally from API
    // let userAge = 88; // from APP storage
    //let userUnderlyingHealthConditions = true;

    // trying with APIs
    let rollingRate100k = myContext.rollingRate100k;
    let userAge = myContext.userAge;
    let userUnderlyingHealthConditions = myContext.userUnderlyingHealthCond;
    let userLocation = myContext.weatherData[4];
    let realFeelTemp = myContext.weatherData[1];

    // add covid weights
    if (rollingRate100k < 150) {
      activityRiskLevel = constants.weights.COVID_LOW_WEIGHT;
    } else if (rollingRate100k < 350) {
      activityRiskLevel = constants.weights.COVID_MODERATE_LOW_WEIGHT;
    } else if (rollingRate100k < 600) {
      activityRiskLevel = constants.weights.COVID_MODERATE_WEIGHT;
    } else if (rollingRate100k < 800) {
      activityRiskLevel = constants.weights.COVID_MODERATE_HIGH_WEIGHT;
    } else if (rollingRate100k >= 800) {
      activityRiskLevel = constants.weights.COVID_HIGH_WEIGHT;
    }

    // add age weight
    if (userAge >= 65) {
      activityRiskLevel += constants.weights.USER_AGE_WEIGHT;
    }

    // add user underlying health conditions weight
    if (userUnderlyingHealthConditions) {
      activityRiskLevel +=
        constants.weights.USER_UNDERLYING_HEALTH_CONDITION_WEIGHT;
    }

    // calculate final risk level by multiplying times the activity factor (1 low, 5 high)
    activityRiskLevel *= activityBaseRiskValue;
    console.log(activityRiskLevel);

    // add activity feedback based on risk level
    if (activityRiskLevel <= 20) {
      activityFeedback = `${activityName} ${constants.sentences.LOW_RISK_FORMAT}`;
    } else if (activityRiskLevel <= 40) {
      activityFeedback = `${activityName} ${constants.sentences.MODERATE_LOW_RISK_FORMAT}`;
    } else if (activityRiskLevel <= 60) {
      activityFeedback = `${activityName} ${constants.sentences.MODERATE_RISK_FORMAT}`;
    } else if (activityRiskLevel <= 80) {
      activityFeedback = `${activityName} ${constants.sentences.MODERATE_HIGH_RISK_FORMAT}`;
    } else if (activityRiskLevel > 80) {
      activityFeedback = `${activityName} ${constants.sentences.HIGH_RISK_FORMAT} ${userLocation}.`;
    }

    // offer additional hints that may be useful based on time of the day, weather ecc.. (unrelated to covid)
    if (activityType === "outdoor") {
      if (isBadWeather()) {
        activityFeedback = `${activityFeedback} ${constants.sentences.BAD_WEATHER_FORECAST} ${constants.sentences.VERY_LOW_TEMP} ${userLocation} is ${realFeelTemp}°C.`;
      }

      //call isSummerSeason()
    }

    // check activity type -> summer? bad weather?

    // check if summer season

    // check if bad weather

    //setActivityFeedback(activityFeedback);
  };

  buildFeedback();

  // Function that returns whether is summer season or not
  function isSummerSeason() {
    let date = new Date();
    let month = date.getMonth();
    return month >= 5 && month <= 7;
  }

  // Function that checks whether is bad weather or not
  function isBadWeather() {
    // TODO: Check if bad weather
    return true;
  }

  // Funtion that checks whether is late in the evening
  function isLateEvening() {
    let date = new Date();
    let hours = date.getHours();
    return hours >= 18 || hours <= 3;
  }

  /*END SECTION */

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      underlayColor="#DDD"
      onPress={() => setModalVisible(true)}
    >
      <MyModal
        modalVisible={modalVisible}
        activityRiskLabel={activityRiskLabel}
        riskStatusColor={
          activityRiskLevel <= 20
            ? colors.lowRisk
            : activityRiskLevel <= 40
            ? colors.moderateLowRisk
            : activityRiskLevel <= 60
            ? colors.moderateRisk
            : activityRiskLevel <= 80
            ? colors.moderateHighRisk
            : activityRiskLevel > 80
            ? colors.highRisk
            : colors.riskUnavailable
        }
        riskValue={activityRiskLevel}
        feedback={activityFeedback}
        closeModal={() => setModalVisible(false)}
      />
      {/* This view renders each activity view */}
      <View
        style={{
          //width: "80%",
          marginTop: 5,
          marginBottom: 5,
          backgroundColor: "white",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        {/* This view renders the activity image */}
        <View
          style={{
            //width: "100%",
            height: 180,
            padding: 3,
            overflow: "hidden",
            //backgroundColor: "white",
          }}
        >
          <ImageBackground
            source={imagePath}
            style={{ width: "100%", height: "100%" }}
          ></ImageBackground>
        </View>

        {/* Renders activity name and its risk level */}
        <View
          style={{
            backgroundColor: "white",
            flexDirection: "column",
            width: "100%",
            //padding: 10,
          }}
        >
          <Text
            style={{
              marginTop: 5,
              fontWeight: "bold",
              fontSize: 18,
              alignSelf: "center",
            }}
          >
            {activityName}
          </Text>
          <Text style={{ marginTop: 5, fontSize: 15, alignSelf: "center" }}>
            {activityRiskLabel}
          </Text>

          {/* Showing the right arrow on the card */}
          <View style={{ position: "absolute", end: 5, top: 20 }}>
            <MaterialCommunityIcons
              style={{ alignSelf: "flex-end" }}
              name="arrow-right" // or arrow-right-circle
              color={"#595959"}
              //onPress={() => alert("Opening activiy info")}
              size={24}
            />
          </View>

          {/* Showing the bottom line indicating risk level as a colour TODO: maybe add gradients!*/}
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <RiskStatusRectangle
              statusColor={
                activityRiskLevel <= 20
                  ? colors.lowRisk
                  : activityRiskLevel <= 40
                  ? colors.moderateLowRisk
                  : activityRiskLevel <= 60
                  ? colors.moderateRisk
                  : activityRiskLevel <= 80
                  ? colors.moderateHighRisk
                  : activityRiskLevel > 80
                  ? colors.highRisk
                  : colors.riskUnavailable
              }
              width={"100%"}
              height={7}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ActivityRowCard;
