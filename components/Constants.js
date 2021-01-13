/**
 * This file contains all the constants needed by the app such
 * as the weights and sentences that are used to generate the
 * feedback based on the covid risk level for the user location
 */

//TODO: REFORMAT NAMES

// Covid-19 and user weights for Standard activities
const COVID_LOW_WEIGHT = 2;
const COVID_MODERATE_LOW_WEIGHT = 4;
const COVID_MODERATE_WEIGHT = 7;
const COVID_MODERATE_HIGH_WEIGHT = 10;
const COVID_HIGH_WEIGHT = 14;
const USER_AGE_WEIGHT = 2;
const USER_UNDERLYING_HEALTH_CONDITION_WEIGHT = 4;

// Covid-19 and user weights for Personalised activities
const PCOVID_LOW = 10;
const PCOVID_MODERATE_LOW = 20;
const PCOVID_MODERATE = 30;
const PCOVID_MODERATE_HIGH = 40;
const PCOVID_HIGH = 50;
const PUSER_AGE_LOW = 0.1;
const PUSER_AGE_MEDIUM = 0.2;
const PUSER_AGE_HIGH = 0.3;
const PUSER_UNDERLYING_HEALTH_CONDITION = 0.5;
const POTHER_PEOPLE_INTERACTION = 0.4;
const PTIME_SPENT_LOW = 0.1;
const PTIME_SPENT_MEDIUM = 0.2;
const PTIME_SPENT_HIGH = 0.3;
const PACTIVITY_INDOOR = 0.2;
const PACTIVITY_OUTDOOR = 0.1;
const PEXECUTION_DURING_BUSY_TIMES = 0.3;
const PEXECUTION_DURING_QUIET_TIMES = 0.1;

// Feedback sentences formats for different levels of risk
const LOW_RISK_FORMAT = "is considered to be low risk";
const MODERATE_LOW_RISK_FORMAT = "is considered to be moderate-low risk";
const MODERATE_RISK_FORMAT = "is considered to be moderate risk";
const MODERATE_HIGH_RISK_FORMAT = "is considered to be moderate-high risk";
const HIGH_RISK_FORMAT = "is considered to be high risk";
const BAD_WEATHER_CURRENT =
  "\n\nAccording to weather data, the current condition";
const VERY_LOW_TEMP = "\n\nCurrent Real Feel temperature in";
const SOCIAL_DISTANCING_LOW =
  "Ensure social distancing is followed at all times";
const SOCIAL_DISTANCING_HIGH =
  "Ensure social distancing is followed at all times, always wear a mask and use hand sanitiser frequently";
const AVOID_ACTIVITY =
  "Please try to avoid this activity to minimise exposure to the virus, until the number of cases decrease.";
const SUMMER_SEASON =
  "Be cautious around you as it may be busier as it's summer season.";

export default constants = {
  weights: {
    COVID_LOW_WEIGHT,
    COVID_MODERATE_LOW_WEIGHT,
    COVID_MODERATE_WEIGHT,
    COVID_MODERATE_HIGH_WEIGHT,
    COVID_HIGH_WEIGHT,
    USER_AGE_WEIGHT,
    USER_UNDERLYING_HEALTH_CONDITION_WEIGHT,
  },
  sentences: {
    LOW_RISK_FORMAT,
    MODERATE_LOW_RISK_FORMAT,
    MODERATE_RISK_FORMAT,
    MODERATE_HIGH_RISK_FORMAT,
    HIGH_RISK_FORMAT,
    BAD_WEATHER_CURRENT,
    VERY_LOW_TEMP,
    SOCIAL_DISTANCING_LOW,
    SOCIAL_DISTANCING_HIGH,
    AVOID_ACTIVITY,
    SUMMER_SEASON,
  },
  personalisedWeights: {
    PCOVID_LOW,
    PCOVID_MODERATE_LOW,
    PCOVID_MODERATE,
    PCOVID_MODERATE_HIGH,
    PCOVID_HIGH,
    PUSER_AGE_LOW,
    PUSER_AGE_MEDIUM,
    PUSER_AGE_HIGH,
    PUSER_UNDERLYING_HEALTH_CONDITION,
    POTHER_PEOPLE_INTERACTION,
    PTIME_SPENT_LOW,
    PTIME_SPENT_MEDIUM,
    PTIME_SPENT_HIGH,
    PACTIVITY_INDOOR,
    PACTIVITY_OUTDOOR,
    PEXECUTION_DURING_BUSY_TIMES,
    PEXECUTION_DURING_QUIET_TIMES,
  },
};
