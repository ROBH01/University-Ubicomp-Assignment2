//start working on a custom modal

import React from "react";
import { Text, View, Modal, StyleSheet, Button } from "react-native";
import RiskStatusRectangle from "./RiskStatusRectangle";
import { ProgressBar } from "@react-native-community/progress-bar-android";
import colors from "../assets/colors";
import { useState } from "react";

// This is a custom modal, adapted to display the beach data when a beach is clicked
const MyModal = ({
  modalVisible,
  closeModal,
  activityBaseRiskValue,
  activityType,
  activityName,
}) => {
  if (!modalVisible) return <View></View>;

  // const [activityFeedback, setActivityFeedback] = useState(""); not allowing me, too many re-renders :(
  let activityFeedback = "";
  let activityRiskLevel = null;

  // COVID-19 and weather weights on the risk level of each activity based on the situation in the area of the user.
  const COVID_LOW_WEIGHT = 2;
  const COVID_MODERATE_LOW_WEIGHT = 4;
  const COVID_MODERATE_WEIGHT = 6;
  const COVID_MODERATE_HIGH_WEIGHT = 8;
  const COVID_HIGH_WEIGHT = 10;

  // Feedback sentence format for different levels of risk TODO: feedback message to be merged into one (refactor) !!!!
  const LOW_RISK_FORMAT = "is considered low risk.";
  const MODERATE_LOW_RISK_FORMAT = "is considered to be moderate-low risk.";
  const MODERATE_RISK_FORMAT = "is considered to be moderate risk.";
  const MODERATE_HIGH_RISK_FORMAT =
    "is considered to be moderate-high risk. If cannot be avoided, please";
  const HIGH_RISK_FORMAT =
    "is considered to be high risk. Please avoid or choose another activity if possible to minimise risk exposure to the virus.";
  const BAD_WEATHER_FORECAST =
    "(Rain? condition var) however is forecasted in the next hours for your location.";
  const VERY_LOW_TEMP = "Current real feel temperature is (x °C). ";
  const LATE_EVENING =
    "Pay extra care around you if you are going to do this activity now as it's quite late in the evening.";
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

    // assign covid weights
    if (rollingRate100k < 150) {
      activityRiskLevel = activityBaseRiskValue + COVID_LOW_WEIGHT;
    } else if (rollingRate100k < 350) {
      activityRiskLevel = activityBaseRiskValue + COVID_MODERATE_LOW_WEIGHT;
    } else if (rollingRate100k < 600) {
      activityRiskLevel = activityBaseRiskValue + COVID_MODERATE_WEIGHT;
    } else if (rollingRate100k < 800) {
      activityRiskLevel = activityBaseRiskValue + COVID_MODERATE_HIGH_WEIGHT;
    } else if (rollingRate100k >= 800) {
      activityRiskLevel = activityBaseRiskValue + COVID_HIGH_WEIGHT;
    }

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
      if (isLateEvening()) {
        activityFeedback = `${activityFeedback} ${LATE_EVENING}`;
      }
      //call isSummerSeason()
      //call isBadWeather()
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

  // Funtion that checks whether is late in the evening
  function isLateEvening() {
    let date = new Date();
    let hours = date.getHours();
    return hours >= 18 || hours <= 3;
  }

  return (
    <Modal
      visible={true}
      animationType="slide"
      statusBarTranslucent={false}
      onRequestClose={closeModal}
      presentationStyle={"fullScreen"}
      //onShow={() => alert("HI")}
    >
      {/* Modal container */}
      <View style={styles.modalContainer}>
        {/* title */}
        <Text style={styles.title}>Covid risk level</Text>

        {/* PROGRESS BAR */}
        {/* <View
          style={{ height: 20, width: "80%", backgroundColor: "pink" }}
        ></View> */}
        <View
          style={{
            height: 20,
            width: "80%",
            //backgroundColor: "pink",
            alignSelf: "center",
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>low</Text>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>high</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            width: "80%",
            height: 25,
            alignSelf: "center",
            backgroundColor: "white",
            marginTop: 5,
            //borderRadius: 15,
          }}
        >
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
            width={activityRiskLevel + "%"}
            height={25}
          />
        </View>
        <Text
          style={{
            fontWeight: "bold",
            alignSelf: "center",
            marginTop: 15,
            fontSize: 16,
            marginBottom: 10,
          }}
        >
          Moderate-high risk
        </Text>

        {/* Section text feedback about the activity with suggestions */}

        <View
          style={{
            height: 100, //TODO: remove after adding the text to let it self sizing
            width: "90%",
            backgroundColor: "pink",
            alignSelf: "center",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <Text>{activityFeedback}</Text>
        </View>

        {/* Current and forecasted weather */}

        {/* <ProgressBar
          styleAttr="Horizontal"
          indeterminate={false}
          progress={0.5}
        /> */}
        {/* <RiskStatusRectangle
          height={20}
          width={"80%"}
          statusColor={"green"}
          alignSelf={"center"}
          borderWidth={0.5}
        /> */}

        {/* Close modal */}
        <Button title="Close" onPress={closeModal} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    // paddingLeft: 10,
    // paddingRight: 10,
    // borderRadius: 15,
    // marginTop: 120,
    // marginLeft: 20,
    // marginRight: 20,
    //margin: 30,
    // paddingTop: 5,
    //height: "60%",
    // paddingBottom: 5,
    alignContent: "center",
    //justifyContent: "space-between",
    backgroundColor: "#e6e6e6",
  },
  title: {
    fontSize: 24,
    marginTop: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default MyModal;
