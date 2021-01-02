/* This file contains all the activities that are displayed to the user.
   Each activity has its standard base risk value, further increased
   based on covid-19 area status and weather data incoming from APIs
   for a maximum of 20 each (100/5), for visualisation purposes:
      - low risk: 10
      - moderate-low risk: 30
      - moderate risk: 50
      - moderate-high risk: 70
      - high risk: 90
*/

const activities = [
  {
    id: "0",
    activityName: "Running",
    activityRisk: "low risk",
    activityBaseRiskValue: 10,
    activityType: "outdoor",
    imagePath: require("../assets/images/running.png"),
  },
  {
    id: "1",
    activityName: "Cycling",
    activityRisk: "low risk",
    activityBaseRiskValue: 30,
    activityType: "outdoor",
    imagePath: require("../assets/images/cycling.png"),
  },
  {
    id: "2",
    activityName: "Horse riding",
    activityRisk: "moderate-high risk",
    activityBaseRiskValue: 50,
    activityType: "outdoor",
    imagePath: require("../assets/images/horse_riding.png"),
  },
  {
    id: "3",
    activityName: "Indoor swimming",
    activityRisk: "moderate-high risk",
    activityBaseRiskValue: 70,
    activityType: "indoor",
    imagePath: require("../assets/images/swimming.png"),
  },
  {
    id: "4",
    activityName: "Snowboarding",
    activityRisk: "moderate-high risk",
    activityBaseRiskValue: 90,
    activityType: "outdoor",
    imagePath: require("../assets/images/snowboarding.png"),
  },
  // {
  //   id: "5",
  //   activityName: "Fishing",
  //   activityRisk: "moderate-high risk",
  //   activityBaseRiskValue: 70,
  //   activityType: "outdoor",
  //   imagePath: require("../assets/images/fishing.png"),
  // },
  // {
  //   id: "7",
  //   activityName: "Study at the library",
  //   activityRisk: "moderate-high risk",
  //   activityBaseRiskValue: 70,
  //   activityType: "indoor",
  //   imagePath: require("../assets/images/library.png"),
  // },
  // {
  //   id: "8",
  //   activityName: "Shopping groceries",
  //   activityRisk: "moderate-high risk",
  //   activityBaseRiskValue: 70,
  //   activityType: "indoor",
  //   imagePath: require("../assets/images/grocery.png"),
  // },
  // {
  //   id: "9",
  //   activityName: "Mall shopping",
  //   activityRisk: "moderate-high risk",
  //   activityBaseRiskValue: 70,
  //   activityType: "indoor",
  //   imagePath: require("../assets/images/mall_shopping.png"),
  // },
  // {
  //   id: "10",
  //   activityName: "Going to the cinema",
  //   activityRisk: "moderate-high risk",
  //   activityBaseRiskValue: 70,
  //   activityType: "indoor",
  //   imagePath: require("../assets/images/cinema.png"),
  // },
  // {
  //   id: "11",
  //   activityName: "Stargazing",
  //   activityRisk: "moderate-high risk",
  //   activityBaseRiskValue: 70,
  //   activityType: "outdoor",
  //   imagePath: require("../assets/images/stargazing.png"),
  // },
  // {
  //   id: "12",
  //   activityName: "Exercising at the gym",
  //   activityRisk: "moderate-high risk",
  //   activityBaseRiskValue: 70,
  //   activityType: "indoor",
  //   imagePath: require("../assets/images/gym.png"),
  // },
];

/**
 * 
low risk
Restaurant takeaway
Going camping
/////Snowboarding
/////Fishing
Drive in movies
////Stargazing
Wash the car

//TODO: Re-assess all the activities and clean up
moderate low risk
////cinema
Running or Walking
Doctor waiting room
////Study at the library
Eating in a restaurant (outside)
Walking in a busy downtown
////Horse riding


moderate
////Grocery shopping
Dinner at friend's house
Going to the beach > get date, check if summer!!!
Working inside the office
////Swimming in a public pool


moderate high
////Shopping at a mall
Going to the barbershop
Eating inside the restaurant
Attending weddings or funerals
Playing football with others
Travel by bus/taxi
Hugging or shaking hands when greeting someone


High
Eating at a buffet
////Exercise at the gym
Going to the cinema
Attending large music concert
Going to a sports stadium
Going to the pub
 */

const getActivities = () => {
  return activities;
};

export default getActivities;
