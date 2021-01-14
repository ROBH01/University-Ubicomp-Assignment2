/**
 * This file contains all the activities that are displayed to the user.
 * Each activity has its standard base risk value, a factor that is
 * multiplied by the current covid-19 area incoming data from the API.
 *  LOW RISK COUNT: 5
 *  MOD-LOW RISK COUNT: 5
 *  MOD RISK COUNT: 5
 *  MOD-HIGH RISK COUNT: 7
 *  HIGH RISK COUNT: 8
 */

const activities = [
  {
    id: 0,
    activityName: "Running",
    activityBaseRiskValue: 1,
    activityType: "outdoor",
    imagePath: require("../assets/images/running.png"),
  },
  {
    id: 1,
    activityName: "Cycling",
    activityBaseRiskValue: 1,
    activityType: "outdoor",
    imagePath: require("../assets/images/cycling.png"),
  },
  {
    id: 2,
    activityName: "Horse riding",
    activityBaseRiskValue: 1,
    activityType: "outdoor",
    imagePath: require("../assets/images/horse_riding.png"),
  },
  {
    id: 3,
    activityName: "Indoor swimming",
    activityBaseRiskValue: 3,
    activityType: "indoor",
    imagePath: require("../assets/images/swimming.png"),
  },
  {
    id: 4,
    activityName: "Snowboarding",
    activityBaseRiskValue: 2,
    activityType: "outdoor",
    imagePath: require("../assets/images/snowboarding.png"),
  },
  {
    id: 5,
    activityName: "Fishing",
    activityBaseRiskValue: 2,
    activityType: "outdoor",
    imagePath: require("../assets/images/fishing.png"),
  },
  {
    id: 7,
    activityName: "Going to the library",
    activityBaseRiskValue: 4,
    activityType: "indoor",
    imagePath: require("../assets/images/library.png"),
  },
  {
    id: 8,
    activityName: "Shopping groceries",
    activityBaseRiskValue: 4,
    activityType: "indoor",
    imagePath: require("../assets/images/grocery.png"),
  },
  {
    id: 9,
    activityName: "Mall shopping",
    activityBaseRiskValue: 4,
    activityType: "indoor",
    imagePath: require("../assets/images/mall_shopping.png"),
  },
  {
    id: 10,
    activityName: "Going to the cinema",
    activityBaseRiskValue: 5,
    activityType: "indoor",
    imagePath: require("../assets/images/cinema.png"),
  },
  {
    id: 11,
    activityName: "Stargazing",
    activityBaseRiskValue: 1,
    activityType: "outdoor",
    imagePath: require("../assets/images/stargazing.png"),
  },
  {
    id: 12,
    activityName: "Exercising at the gym",
    activityBaseRiskValue: 5,
    activityType: "indoor",
    imagePath: require("../assets/images/gym.png"),
  },
  {
    id: 13,
    activityName: "Restaurant collection",
    activityBaseRiskValue: 2,
    activityType: "indoor",
    imagePath: require("../assets/images/food_collection.png"),
  },
  {
    id: 14,
    activityName: "Self-washing the car",
    activityBaseRiskValue: 2,
    activityType: "outdoor",
    imagePath: require("../assets/images/car_wash.png"),
  },
  {
    id: 15,
    activityName: "Movie drive-in",
    activityBaseRiskValue: 1,
    activityType: "outdoor",
    imagePath: require("../assets/images/drive_in_cinema.png"),
  },
  {
    id: 16,
    activityName: "Visiting the GP",
    activityBaseRiskValue: 3,
    activityType: "indoor",
    imagePath: require("../assets/images/gp.png"),
  },
  {
    id: 17,
    activityName: "Dining at a friend's house",
    activityBaseRiskValue: 4,
    activityType: "indoor",
    imagePath: require("../assets/images/dining_friend.png"),
  },
  {
    id: 18,
    activityName: "Working in-office",
    activityBaseRiskValue: 3,
    activityType: "indoor",
    imagePath: require("../assets/images/office_work.png"),
  },
  {
    id: 19,
    activityName: "Going to the barbershop",
    activityBaseRiskValue: 3,
    activityType: "indoor",
    imagePath: require("../assets/images/barber.png"),
  },
  {
    id: 20,
    activityName: "Travel by bus",
    activityBaseRiskValue: 4,
    activityType: "indoor",
    imagePath: require("../assets/images/bus_travel.png"),
  },
  {
    id: 21,
    activityName: "Taking a taxi",
    activityBaseRiskValue: 3,
    activityType: "indoor",
    imagePath: require("../assets/images/taxi.png"),
  },
  {
    id: 22,
    activityName: "Eating at a buffet",
    activityBaseRiskValue: 5,
    activityType: "indoor",
    imagePath: require("../assets/images/buffet.png"),
  },
  {
    id: 23,
    activityName: "Attending a large music concert",
    activityBaseRiskValue: 5,
    activityType: "outdoor",
    imagePath: require("../assets/images/music_concert.png"),
  },
  {
    id: 24,
    activityName: "Going to the pub",
    activityBaseRiskValue: 5,
    activityType: "indoor",
    imagePath: require("../assets/images/pub.png"),
  },
  {
    id: 25,
    activityName: "Eating inside a restaurant",
    activityBaseRiskValue: 5,
    activityType: "indoor",
    imagePath: require("../assets/images/eat_in_restaurant.png"),
  },
  {
    id: 26,
    activityName: "Attending a wedding",
    activityBaseRiskValue: 4,
    activityType: "outdoor",
    imagePath: require("../assets/images/wedding.png"),
  },
  {
    id: 27,
    activityName: "Going to a busy beach",
    activityBaseRiskValue: 4,
    activityType: "outdoor",
    imagePath: require("../assets/images/beach.png"),
  },
  {
    id: 28,
    activityName: "Playing group games",
    activityBaseRiskValue: 5,
    activityType: "outdoor",
    imagePath: require("../assets/images/group_games.png"),
  },
  {
    id: 29,
    activityName: "Camping with the partner",
    activityBaseRiskValue: 2,
    activityType: "outdoor",
    imagePath: require("../assets/images/camping.png"),
  },
  {
    id: 30,
    activityName: "Going to a sports stadium",
    activityBaseRiskValue: 5,
    activityType: "outdoor",
    imagePath: require("../assets/images/sports_stadium.png"),
  },
];

const getActivities = () => {
  return activities;
};

export default getActivities;
