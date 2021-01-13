import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
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
  // Getting data from context
  const myContext = useContext(AppContext);
  console.log(myContext);

  const [modalVisible, setModalVisible] = useState(false);

  // Getting APIs data
  let rollingRate100k = myContext.covidData[0];
  let userAge = myContext.userAge;
  let userUnderlyingHealthConditions = myContext.userUnderlyingHealthCond;
  let userLocation = myContext.weatherData[4];
  let currentRealFeelTemp = myContext.weatherData[1];
  let currentWeatherCondition = myContext.weatherData[3];
  let activityFeedback = "";
  let activityRiskLevel = null;
  let personalisedRiskLevelFactors = null;

  /**
   * Function that checks wether currently is bad weather or not based on the Weather API
   * @param {boolean} currentCondition - Current weather condition
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
   * @param {boolean} currentRealFeelTemp - Temperature under which is considered very low temperature
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

  /**
   * Function that adds the covid weights based on the covid status for the requested area the user is in
   * @param {number} rollingRate100k - The rolling rate per 100k people
   * @param {string} weights - Either the normal weights or personalisedWeights
   */
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
      } else if (rollingRate100k < 350) {
        activityRiskLevel = constants.personalisedWeights.PCOVID_MODERATE_LOW;
      } else if (rollingRate100k < 600) {
        activityRiskLevel = constants.personalisedWeights.PCOVID_MODERATE;
      } else if (rollingRate100k < 800) {
        activityRiskLevel = constants.personalisedWeights.PCOVID_MODERATE_HIGH;
      } else if (rollingRate100k >= 800) {
        activityRiskLevel = constants.personalisedWeights.PCOVID_HIGH;
      }
    }
  }

  /**
   * Function that adds the age weights
   * @param {number} userAge
   */
  function addAgeWeight(userAge) {
    if (userAge >= 65) {
      activityRiskLevel += constants.weights.USER_AGE_WEIGHT;
    }
  }

  /**
   * Function that adds extra weights if the user has any underlying health conditions
   * @param {boolean} userUnderlyingHealthConditions
   */
  function addUnderlyingHealthCondWeight(userUnderlyingHealthConditions) {
    if (userUnderlyingHealthConditions) {
      activityRiskLevel +=
        constants.weights.USER_UNDERLYING_HEALTH_CONDITION_WEIGHT;
    }
  }

  /**
   * Function that builds up the feedback sentence based on the risk level of the activity
   * @param {boolean} isPersonalised
   */
  function addFeedbackFromRiskLevel(isPersonalised) {
    if (isPersonalised) {
      // Adding feedback for the personalised user activity
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
      // Adding normal activity feedback
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

  /**
   * Function that offers additional hints to the user such as
   * weather status, unrelated to covid risk.
   */
  function offerHints() {
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
    activityRiskLevel *= activityBaseRiskValue;
    addFeedbackFromRiskLevel(false);
    offerHints();
  }

  buildFeedback();

  function provideUserSpecificActivityFeedback(
    userAgeBand,
    userUnderlyingHealthCond,
    involvesOtherPeople,
    timeSpentOnActivity,
    activityType,
    activityTimeExecution
  ) {
    // Initialise vars
    activityFeedback = "";
    activityRiskLevel = null;
    personalisedRiskLevelFactors = null;
    let riskLabel = null;
    let personalisedActivityData = [];

    // Add covid weights
    addCovidWeights(rollingRate100k, "personalisedWeights");

    // Add age weights
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

    // Add underlying health conditions weights
    if (userUnderlyingHealthCond) {
      personalisedRiskLevelFactors +=
        constants.personalisedWeights.PUSER_UNDERLYING_HEALTH_CONDITION;
    }

    // Add other people involvment weights
    if (involvesOtherPeople) {
      personalisedRiskLevelFactors +=
        constants.personalisedWeights.POTHER_PEOPLE_INTERACTION;
    }

    // Add time spent on activity weights
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

    // Add activity type weights
    if (activityType === "indoor") {
      personalisedRiskLevelFactors +=
        constants.personalisedWeights.PACTIVITY_INDOOR;
    } else {
      personalisedRiskLevelFactors +=
        constants.personalisedWeights.PACTIVITY_OUTDOOR;
    }

    // Add activity timing weights
    if (activityTimeExecution === "busy") {
      personalisedRiskLevelFactors +=
        constants.personalisedWeights.PEXECUTION_DURING_BUSY_TIMES;
    } else {
      personalisedRiskLevelFactors +=
        constants.personalisedWeights.PEXECUTION_DURING_QUIET_TIMES;
    }

    // Calculate risk level
    personalisedRiskLevelFactors *= activityRiskLevel;
    addFeedbackFromRiskLevel(true);

    // Gather appropriate risk label
    if (personalisedRiskLevelFactors <= 20) {
      riskLabel = "Low risk";
    } else if (personalisedRiskLevelFactors <= 40) {
      riskLabel = "Moderate-low risk";
    } else if (personalisedRiskLevelFactors <= 60) {
      riskLabel = "Moderate risk";
    } else if (personalisedRiskLevelFactors <= 80) {
      riskLabel = "Moderate-high risk";
    } else if (personalisedRiskLevelFactors > 80) {
      riskLabel = "High risk";
    }

    personalisedActivityData = [
      Math.floor(personalisedRiskLevelFactors),
      activityFeedback,
      riskLabel,
    ];
    return personalisedActivityData;
  }

  // Saving function into context as to be used from other files
  myContext.provideUserSpecificActivityFeedback = provideUserSpecificActivityFeedback;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      underlayColor="#DDD"
      onPress={() => setModalVisible(true)}
    >
      {/* Modal showing more details about the activity clicked on */}
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

      {/* This view renders the activity card */}
      <View style={styles.activityCard}>
        {/* Image view */}
        <View style={styles.imageView}>
          <ImageBackground
            source={imagePath}
            style={{ width: "100%", height: "100%" }}
          ></ImageBackground>
        </View>

        {/* Renders activity name and its risk level */}
        <View style={styles.activityNameRiskView}>
          <Text style={styles.activityName}>{activityName}</Text>
          <Text style={styles.activityRiskLevel}>{activityRiskLabel}</Text>

          {/* Showing the right arrow on the card */}
          <View style={styles.rightArrowIcon}>
            <MaterialCommunityIcons
              style={{ alignSelf: "flex-end" }}
              name="arrow-right"
              color={"#595959"}
              size={24}
            />
          </View>

          {/* Showing the bottom line indicating risk level as a colour */}
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

const styles = StyleSheet.create({
  activityCard: {
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "flex-start",
    elevation: 6,
  },
  imageView: {
    height: 180,
    padding: 3,
    overflow: "hidden",
  },
  activityNameRiskView: {
    backgroundColor: "white",
    flexDirection: "column",
    width: "100%",
  },
  activityName: {
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "center",
  },
  activityRiskLevel: {
    marginTop: 2,
    fontSize: 15,
    alignSelf: "center",
  },
  rightArrowIcon: {
    position: "absolute",
    end: 5,
    top: 15,
  },
});

export default ActivityRowCard;
