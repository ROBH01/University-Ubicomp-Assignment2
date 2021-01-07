// COVID-19 and user weights
const COVID_LOW_WEIGHT = 2;
const COVID_MODERATE_LOW_WEIGHT = 4;
const COVID_MODERATE_WEIGHT = 6;
const COVID_MODERATE_HIGH_WEIGHT = 9;
const COVID_HIGH_WEIGHT = 12;
const USER_AGE_WEIGHT = 3;
const USER_UNDERLYING_HEALTH_CONDITION_WEIGHT = 5;

// Feedback sentences formats for different levels of risk
const LOW_RISK_FORMAT = "is considered to be low risk";
const MODERATE_LOW_RISK_FORMAT = "is considered to be moderate-low risk";
const MODERATE_RISK_FORMAT = "is considered to be moderate risk";
const MODERATE_HIGH_RISK_FORMAT = "is considered to be moderate-high risk";
const HIGH_RISK_FORMAT = "is considered to be high risk";
const BAD_WEATHER_CURRENT =
  "\nAccording to weather data, the current condition";
const VERY_LOW_TEMP = "\n\nCurrent Real Feel temperature in";
const SOCIAL_DISTANCING_LOW =
  "Ensure social distancing is followed at all times";
const SOCIAL_DISTANCING_HIGH =
  "Ensure social distancing is followed at all times, always wear a mask and use hand sanitiser frequently";
const AVOID_ACTIVITY =
  "Please try to avoid this activity to minimise exposure to the virus, until the number of cases decrease.";

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
  },
};
