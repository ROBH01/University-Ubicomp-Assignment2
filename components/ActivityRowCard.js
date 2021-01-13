import React, { useState } from "react";
import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RiskStatusRectangle from "./RiskStatusRectangle";
import MyModal from "./MyModal";
import colors from "../assets/colors";
import constants from "./Constants";
import AppContext from "./AppContext";
import { useContext } from "react";

const ActivityRowCard = ({
  activityName,
  activityRiskLabel,
  activityBaseRiskValue,
  activityType,
  imagePath,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Getting data from context
  const myContext = useContext(AppContext);
  console.log(myContext);

  // Getting APIs data
  let rollingRate100k = myContext.covidData[0];
  let userAge = myContext.userAge;
  let userUnderlyingHealthConditions = myContext.userUnderlyingHealthCond;
  let userLocation = myContext.weatherData[4];
  let currentRealFeelTemp = myContext.weatherData[1];
  let currentWeatherCondition = myContext.weatherData[3];
  let activityFeedback = "";
  let activityRiskLevel = null;
  let personalisedRiskLevel = null;
  let personalisedRiskLevelFactors = null;

  /**
   * Function that checks wether currently is bad weather or not based on the Weather API
   * @param {} currentCondition - Current weather condition
   */
  function isBadWeather(currentCondition) {
    if (
      currentCondition === "Thunderstorm" ||
      currentCondition === "Rain" ||
      currentCondition === "Snow"
    ) {
      return true;
    }
  }

  /**
   * Function that returns wether is currently a very low Real Feel temperature
   * @param {} currentRealFeelTemp - Temperature under which is returned true
   */
  function isVeryLowTemp(currentRealFeelTemp) {
    if (currentRealFeelTemp <= 3) {
      return true;
    }
  }

  /**
   * Function that returns whether is summer season or not
   */
  function isSummerSeason() {
    let date = new Date();
    let month = date.getMonth();
    return month >= 5 && month <= 7;
  }

  //TODO: //FIXME: OLD ONE
  // function addCovidWeights(rollingRate100k) {
  //   // Adding covid weights based on covid status of the area (utla rates taken and adjusted from: https://coronavirus.data.gov.uk/details/interactive-map)
  // if (rollingRate100k < 150) {
  //   activityRiskLevel = constants.weights.COVID_LOW_WEIGHT;
  // } else if (rollingRate100k < 350) {
  //   activityRiskLevel = constants.weights.COVID_MODERATE_LOW_WEIGHT;
  // } else if (rollingRate100k < 600) {
  //   activityRiskLevel = constants.weights.COVID_MODERATE_WEIGHT;
  // } else if (rollingRate100k < 800) {
  //   activityRiskLevel = constants.weights.COVID_MODERATE_HIGH_WEIGHT;
  // } else if (rollingRate100k >= 800) {
  //   activityRiskLevel = constants.weights.COVID_HIGH_WEIGHT;
  // }
  // }

  function addCovidWeights(rollingRate100k, weights) {
    // Adding covid weights based on covid status of the area (utla rates taken and adjusted from: https://coronavirus.data.gov.uk/details/interactive-map)
    if (weights === "weights") {
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
    } else {
      if (rollingRate100k < 150) {
        activityRiskLevel = constants.personalisedWeights.PCOVID_LOW;
        personalisedRiskLevel = constants.personalisedWeights.PCOVID_LOW;
      } else if (rollingRate100k < 350) {
        activityRiskLevel = constants.personalisedWeights.PCOVID_MODERATE_LOW;
        personalisedRiskLevel =
          constants.personalisedWeights.PCOVID_MODERATE_LOW;
      } else if (rollingRate100k < 600) {
        activityRiskLevel = constants.personalisedWeights.PCOVID_MODERATE;
        personalisedRiskLevel = constants.personalisedWeights.PCOVID_MODERATE;
      } else if (rollingRate100k < 800) {
        activityRiskLevel = constants.personalisedWeights.PCOVID_MODERATE_HIGH;
        personalisedRiskLevel =
          constants.personalisedWeights.PCOVID_MODERATE_HIGH;
      } else if (rollingRate100k >= 800) {
        activityRiskLevel = constants.personalisedWeights.PCOVID_HIGH;
        personalisedRiskLevel = constants.personalisedWeights.PCOVID_HIGH;
      }
    }
  }

  function addAgeWeight(userAge) {
    // Adding age weight
    if (userAge >= 65) {
      activityRiskLevel += constants.weights.USER_AGE_WEIGHT;
    }
  }

  function addUnderlyingHealthCondWeight(userUnderlyingHealthConditions) {
    // Adding user underlying health conditions weight
    if (userUnderlyingHealthConditions) {
      activityRiskLevel +=
        constants.weights.USER_UNDERLYING_HEALTH_CONDITION_WEIGHT;
    }
  }

  function calculateRiskLevel() {
    // Calculating final risk level by multiplying by the activity risk factor (1 low, 5 high)
    activityRiskLevel *= activityBaseRiskValue;
    //console.log(activityRiskLevel);
  }

  function addFeedbackFromRiskLevel(isPersonalised) {
    if (isPersonalised) {
      // Adding activity feedback based on risk level
      if (personalisedRiskLevelFactors <= 20) {
        activityFeedback = `According to the choices made, this activity ${constants.sentences.LOW_RISK_FORMAT} based on government covid data at the moment.`;
      } else if (personalisedRiskLevelFactors <= 40) {
        activityFeedback = `According to the choices made, this activity ${constants.sentences.MODERATE_LOW_RISK_FORMAT} based on government covid data at the moment.`;
      } else if (personalisedRiskLevelFactors <= 60) {
        activityFeedback = `According to the choices made, this activity ${constants.sentences.MODERATE_RISK_FORMAT} based on government covid data at the moment. ${constants.sentences.SOCIAL_DISTANCING_LOW}.`;
      } else if (personalisedRiskLevelFactors <= 80) {
        activityFeedback = `According to the choices made, this activity ${constants.sentences.MODERATE_HIGH_RISK_FORMAT} based on government covid data at the moment ${constants.sentences.SOCIAL_DISTANCING_LOW}.`;
      } else if (personalisedRiskLevelFactors > 80) {
        activityFeedback = `According to the choices made, this activity ${constants.sentences.HIGH_RISK_FORMAT}. ${constants.sentences.AVOID_ACTIVITY}`;
      }
    } else {
      // Adding activity feedback based on risk level
      if (activityRiskLevel <= 20) {
        activityFeedback = `${activityName} ${constants.sentences.LOW_RISK_FORMAT} in ${userLocation} according to the government covid data at the moment.`;
      } else if (activityRiskLevel <= 40) {
        activityFeedback = `${activityName} ${constants.sentences.MODERATE_LOW_RISK_FORMAT} in ${userLocation} according to the government covid data at the moment.`;
      } else if (activityRiskLevel <= 60) {
        activityFeedback = `${activityName} ${constants.sentences.MODERATE_RISK_FORMAT} in ${userLocation} according to the government covid data at the moment.`;
      } else if (activityRiskLevel <= 80) {
        activityFeedback = `${activityName} ${constants.sentences.MODERATE_HIGH_RISK_FORMAT} in ${userLocation} according to the government covid data at the moment.`;
      } else if (activityRiskLevel > 80) {
        activityFeedback = `${activityName} ${constants.sentences.HIGH_RISK_FORMAT} in ${userLocation}. ${constants.sentences.AVOID_ACTIVITY}`;
      }
    }
  }

  function offerHints() {
    // Offering additional hints that may be useful based on weather conditions (unrelated to covid)
    if (activityType === "outdoor") {
      if (activityRiskLevel > 50) {
        activityFeedback = `${activityFeedback} ${constants.sentences.SOCIAL_DISTANCING_LOW}.`;
      }

      if (isSummerSeason()) {
        activityFeedback = `${activityFeedback} ${constants.sentences.SUMMER_SEASON} `;
      }
      if (isBadWeather(currentWeatherCondition)) {
        activityFeedback = `${activityFeedback} ${constants.sentences.BAD_WEATHER_CURRENT} in ${userLocation} is ${currentWeatherCondition}.`;
      }
      if (isVeryLowTemp(currentRealFeelTemp)) {
        activityFeedback = `${activityFeedback} ${
          constants.sentences.VERY_LOW_TEMP
        } ${userLocation} is ${Math.floor(currentRealFeelTemp)} °C.`;
      }
    } else {
      activityFeedback = `${activityFeedback} ${constants.sentences.SOCIAL_DISTANCING_HIGH}.`;
    }
  }
  function buildFeedback() {
    //FIXME: THIS IS FOR DEMO ONLY TESTING WITHOUT APIs
    //let rollingRate100k = 900; // ideally from API
    // let userAge = 88; // from APP storage
    //let userUnderlyingHealthConditions = true;

    addCovidWeights(rollingRate100k, "weights");
    addAgeWeight(userAge);
    addUnderlyingHealthCondWeight(userUnderlyingHealthConditions);
    calculateRiskLevel();
    addFeedbackFromRiskLevel(false);
    offerHints();
  }

  // Building the feedback to the user
  buildFeedback();

  function provideUserSpecificActivityFeedback(
    userAgeBand,
    userUnderlyingHealthCond,
    involvesOtherPeople,
    timeSpentOnActivity,
    activityType,
    activityTimeExecution
  ) {
    console.log(
      userAgeBand,
      typeof userAgeBand,
      userUnderlyingHealthCond,
      typeof userUnderlyingHealthCond,
      involvesOtherPeople,
      typeof involvesOtherPeople,
      timeSpentOnActivity,
      typeof timeSpentOnActivity,
      activityType,
      typeof activityType,
      activityTimeExecution,
      typeof activityTimeExecution
    );

    // set feedback and activity risk level to "", null
    activityFeedback = "";
    activityRiskLevel = null;
    personalisedRiskLevelFactors = null;

    // Do covid weights, change main method
    addCovidWeights(rollingRate100k, "personalisedWeights");

    // do age weights
    if (userAgeBand === 0) {
      personalisedRiskLevelFactors +=
        constants.personalisedWeights.PUSER_AGE_LOW;
    } else if (userAgeBand === 1) {
      personalisedRiskLevelFactors +=
        constants.personalisedWeights.PUSER_AGE_MEDIUM;
    } else if (userAgeBand === 2) {
      personalisedRiskLevelFactors +=
        constants.personalisedWeights.PUSER_AGE_HIGH;
    }
    console.log("LOL: " + personalisedRiskLevelFactors);

    // UHC
    if (userUnderlyingHealthCond) {
      personalisedRiskLevelFactors +=
        constants.personalisedWeights.PUSER_UNDERLYING_HEALTH_CONDITION;
    }

    // add inlv inter with other ppl weight
    if (involvesOtherPeople) {
      personalisedRiskLevelFactors +=
        constants.personalisedWeights.POTHER_PEOPLE_INTERACTION;
    }

    // add time spent on act weight
    if (timeSpentOnActivity === 0) {
      personalisedRiskLevelFactors +=
        constants.personalisedWeights.PTIME_SPENT_LOW;
    } else if (timeSpentOnActivity === 1) {
      personalisedRiskLevelFactors +=
        constants.personalisedWeights.PTIME_SPENT_MEDIUM;
    } else if (timeSpentOnActivity === 2) {
      personalisedRiskLevelFactors +=
        constants.personalisedWeights.PTIME_SPENT_HIGH;
    }

    // add type act weights
    if (activityType === "indoor") {
      personalisedRiskLevelFactors +=
        constants.personalisedWeights.PACTIVITY_INDOOR;
    } else {
      personalisedRiskLevelFactors +=
        constants.personalisedWeights.PACTIVITY_OUTDOOR;
    }

    // add act timing weight
    if (activityTimeExecution === "busy") {
      personalisedRiskLevelFactors +=
        constants.personalisedWeights.PEXECUTION_DURING_BUSY_TIMES;
    } else {
      personalisedRiskLevelFactors +=
        constants.personalisedWeights.PEXECUTION_DURING_QUIET_TIMES;
    }

    // calculate risk level
    personalisedRiskLevelFactors *= activityRiskLevel;
    addFeedbackFromRiskLevel(true);
    //console.log(activityFeedback);
    //alert(personalisedRiskLevelFactors);

    let personalisedActivityData = [
      Math.floor(personalisedRiskLevelFactors),
      activityFeedback,
    ];

    return personalisedActivityData;
  }

  myContext.provideUserSpecificActivityFeedback = provideUserSpecificActivityFeedback;
  console.log(myContext);

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
          elevation: 6,
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
            //backgroundColor:"pink",
            width: "100%",
            //padding: 10,
          }}
        >
          <Text
            style={{
              //marginTop: 5,
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
