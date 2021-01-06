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

  // const [activityFeedback, setActivityFeedback] = useState(""); not allowing me, too many re-renders :(
  let activityFeedback = "";
  let activityRiskLevel = null;

  // COVID-19 and weather weights on the risk level of each activity based on the situation in the area of the user.
  const COVID_LOW_WEIGHT = 2;
  const COVID_MODERATE_LOW_WEIGHT = 4;
  const COVID_MODERATE_WEIGHT = 6;
  const COVID_MODERATE_HIGH_WEIGHT = 9;
  const COVID_HIGH_WEIGHT = 12;
  const USER_AGE_WEIGHT = 3;
  const USER_UNDERLYING_HEALTH_CONDITION_WEIGHT = 5;

  // Feedback sentence format for different levels of risk TODO: feedback message to be merged into one (refactor) !!!!
  const LOW_RISK_FORMAT = "is considered low risk.";
  const MODERATE_LOW_RISK_FORMAT = "is considered to be moderate-low risk.";
  const MODERATE_RISK_FORMAT = "is considered to be moderate risk.";
  const MODERATE_HIGH_RISK_FORMAT =
    "is considered to be moderate-high risk. If cannot be avoided, please";
  const HIGH_RISK_FORMAT =
    "is considered to be high risk. Please avoid or choose another activity if possible to minimise exposure to the virus.";
  const BAD_WEATHER_FORECAST =
    "(Rain? condition var) however is forecasted in the next hours for your location.";
  const VERY_LOW_TEMP =
    "\nCurrent real feel temperature in (Get user location) is (x °C).";
  const LATE_EVENING =
    "\n\nPay extra care around you if you are going to do this activity now as it's quite late in the evening.";
  const SOCIAL_DISTANCING_WARNING =
    "ensure social distancing is followed at all times, always wear a mask and use hand sanitiser frequently.";

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
    let rollingRate100k = 900; // ideally from API
    let userAge = 88; // from APP storage
    let userUnderlyingHealthConditions = true;

    // add covid weights
    if (rollingRate100k < 150) {
      activityRiskLevel = COVID_LOW_WEIGHT;
    } else if (rollingRate100k < 350) {
      activityRiskLevel = COVID_MODERATE_LOW_WEIGHT;
    } else if (rollingRate100k < 600) {
      activityRiskLevel = COVID_MODERATE_WEIGHT;
    } else if (rollingRate100k < 800) {
      activityRiskLevel = COVID_MODERATE_HIGH_WEIGHT;
    } else if (rollingRate100k >= 800) {
      activityRiskLevel = COVID_HIGH_WEIGHT;
    }

    // add age weight
    if (userAge >= 65) {
      activityRiskLevel += USER_AGE_WEIGHT;
    }

    // add user underlying health conditions weight
    if (userUnderlyingHealthConditions) {
      activityRiskLevel += USER_UNDERLYING_HEALTH_CONDITION_WEIGHT;
    }

    // calculate final risk level by multiplying times the activity factor (1 low, 5 high)
    activityRiskLevel *= activityBaseRiskValue;
    console.log(activityRiskLevel);

    // add activity feedback based on risk level
    if (activityRiskLevel <= 20) {
      activityFeedback = `${activityName} ${LOW_RISK_FORMAT}`;
    } else if (activityRiskLevel <= 40) {
      activityFeedback = `${activityName} ${MODERATE_LOW_RISK_FORMAT}`;
    } else if (activityRiskLevel <= 60) {
      activityFeedback = `${activityName} ${MODERATE_RISK_FORMAT}`;
    } else if (activityRiskLevel <= 80) {
      activityFeedback = `${activityName} ${MODERATE_HIGH_RISK_FORMAT} ${SOCIAL_DISTANCING_WARNING}`;
    } else if (activityRiskLevel > 80) {
      activityFeedback = `${activityName} ${HIGH_RISK_FORMAT}`;
    }

    // offer additional hints that may be useful based on time of the day, weather ecc.. (unrelated to covid)
    if (activityType === "outdoor") {
      if (isBadWeather()) {
        activityFeedback = `${activityFeedback} ${BAD_WEATHER_FORECAST} ${VERY_LOW_TEMP}`;
      }

      if (isLateEvening()) {
        activityFeedback = `${activityFeedback} ${LATE_EVENING}`;
      }

      //call isSummerSeason()
    } else {
      if (activityRiskLevel >= 60) {
        `${activityFeedback} ${
          SOCIAL_DISTANCING_WARNING.charAt(0).toUpperCase() +
          SOCIAL_DISTANCING_WARNING.slice(1)
        }`;
      }
    }

    // check if late evening

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
      activeOpacity={0.7}
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
          width: "100%",
          marginTop: 10,
          backgroundColor: "white",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        {/* This view renders the activity image */}
        <View
          style={{
            width: "100%",
            height: 140,
            //padding: 5,
            overflow: "hidden",
            backgroundColor: "white",
          }}
        >
          <ImageBackground
            //borderRadius={5}
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
              marginTop: 2,
              fontWeight: "bold",
              fontSize: 18,
              alignSelf: "center",
            }}
          >
            {activityName}
          </Text>
          <Text style={{ marginTop: 2, fontSize: 15, alignSelf: "center" }}>
            {activityRiskLabel}
          </Text>

          {/* Showing the right arrow on the card */}
          <View style={{ position: "absolute", end: 5, top: 15 }}>
            <MaterialCommunityIcons
              style={{ alignSelf: "flex-end" }}
              name="arrow-right" // or arrow-right-circle
              color={"#595959"}
              //onPress={() => alert("Opening activiy info")}
              size={24}
            />
          </View>

          {/* Showing the bottom line indicating risk level as a colour TODO: maybe add gradients!*/}
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <RiskStatusRectangle
              statusColor={
                activityBaseRiskValue === 1
                  ? colors.lowRisk
                  : activityBaseRiskValue === 2
                  ? colors.moderateLowRisk
                  : activityBaseRiskValue === 3
                  ? colors.moderateRisk
                  : activityBaseRiskValue === 4
                  ? colors.moderateHighRisk
                  : activityBaseRiskValue === 5
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
