// This file contains all the data about each beach

const beaches = [
  {
    id: "0",
    beachName: "Running",
    beachStatus: "Low risk",
    latitude: "50.711087",
    longitude: "-1.895755",
    latitudeParking: "50.714850",
    longitudeParking: "-1.890675",
    lifeguarded: "No",
    publicToilets: "Yes",
    parkingAvailability: "No parking at this beach",
    dogWalking: "Yes",
    cycling: "Yes",
    bbq: "Only allowed after 6pm",
    warningInfo: "",
    imagePath: require("../assets/running.png"),
  },
  {
    id: "1",
    beachName: "Cycling",
    beachStatus: "Low risk",
    latitude: "50.731404",
    longitude: "-1.731441",
    latitudeParking: "50.728744",
    longitudeParking: "-1.734910",
    lifeguarded: "No",
    publicToilets: "Yes",
    parkingAvailability: "67",
    dogWalking: "Yes",
    cycling: "Yes",
    bbq: "Only allowed after 6pm",
    warningInfo: "",
    imagePath: require("../assets/cycling.png"),
  },
  {
    id: "2",
    beachName: "Horse riding",
    latitude: "50.719996",
    longitude: "-1.841179",
    latitudeParking: "50.720522",
    longitudeParking: "-1.842338",
    beachStatus: "Moderate-high",
    lifeguarded: "No",
    publicToilets: "Yes",
    parkingAvailability: "No parking at this beach",
    dogWalking: "No",
    cycling: "No",
    bbq: "Only allowed after 6pm",
    warningInfo: "",
    imagePath: require("../assets/horse_riding.png"),
  },
  {
    id: "3",
    beachName: "Swimming",
    latitude: "50.719702",
    longitude: "-1.845608",
    latitudeParking: "50.720522",
    longitudeParking: "-1.842338",
    beachStatus: "Moderate-high",
    lifeguarded: "No",
    publicToilets: "Yes",
    parkingAvailability: "43",
    dogWalking: "No",
    cycling: "No",
    warningInfo: "",
    bbq: "Permitted in the designated area only",
    imagePath: require("../assets/swimming.png"),
  },
  {
    id: "4",
    beachName: "Snowboarding",
    latitude: "50.716826",
    longitude: "-1.870989",
    latitudeParking: "50.717070",
    longitudeParking: "-1.873347",
    beachStatus: "Moderate-high",
    lifeguarded: "Yes",
    publicToilets: "Yes",
    parkingAvailability: "23",
    dogWalking: "No",
    cycling: "No",
    warningInfo: "",
    imagePath: require("../assets/snowboarding.png"),
    bbq: "Permitted in the designated area only",
  },
  {
    id: "5",
    beachName: "Fishing",
    latitude: "50.715330",
    longitude: "-1.878462",
    latitudeParking: "50.717687",
    longitudeParking: "-1.881558",
    beachStatus: "Moderate-high",
    lifeguarded: "Yes",
    publicToilets: "Yes",
    parkingAvailability: "26",
    dogWalking: "No",
    cycling: "No",
    warningInfo: "",
    bbq: "Only allowed after 6pm",
    imagePath: require("../assets/fishing.png"),
  },
  {
    id: "7",
    beachName: "Study at the library",
    latitude: "50.715330",
    longitude: "-1.878462",
    latitudeParking: "50.717687",
    longitudeParking: "-1.881558",
    beachStatus: "Moderate-high",
    lifeguarded: "Yes",
    publicToilets: "Yes",
    parkingAvailability: "26",
    dogWalking: "No",
    cycling: "No",
    warningInfo: "",
    bbq: "Only allowed after 6pm",
    imagePath: require("../assets/library.png"),
  },
  {
    id: "8",
    beachName: "Shopping groceries",
    latitude: "50.715330",
    longitude: "-1.878462",
    latitudeParking: "50.717687",
    longitudeParking: "-1.881558",
    beachStatus: "Moderate-high",
    lifeguarded: "Yes",
    publicToilets: "Yes",
    parkingAvailability: "26",
    dogWalking: "No",
    cycling: "No",
    warningInfo: "",
    imagePath: require("../assets/grocery.png"),
    bbq: "Only allowed after 6pm",
  },
  {
    id: "9",
    beachName: "Mall shopping",
    latitude: "50.715330",
    longitude: "-1.878462",
    latitudeParking: "50.717687",
    longitudeParking: "-1.881558",
    beachStatus: "Moderate-high",
    lifeguarded: "Yes",
    publicToilets: "Yes",
    parkingAvailability: "26",
    dogWalking: "No",
    cycling: "No",
    warningInfo: "",
    imagePath: require("../assets/mall_shopping.png"),
    bbq: "Only allowed after 6pm",
  },
  {
    id: "10",
    beachName: "Going to the cinema",
    latitude: "50.715330",
    longitude: "-1.878462",
    latitudeParking: "50.717687",
    longitudeParking: "-1.881558",
    beachStatus: "Moderate-high",
    lifeguarded: "Yes",
    publicToilets: "Yes",
    parkingAvailability: "26",
    dogWalking: "No",
    cycling: "No",
    warningInfo: "",
    bbq: "Only allowed after 6pm",
    imagePath: require("../assets/cinema.png"),
  },
  {
    id: "11",
    beachName: "Stargazing",
    latitude: "50.715330",
    longitude: "-1.878462",
    latitudeParking: "50.717687",
    longitudeParking: "-1.881558",
    beachStatus: "Moderate-high",
    lifeguarded: "Yes",
    publicToilets: "Yes",
    parkingAvailability: "26",
    dogWalking: "No",
    cycling: "No",
    warningInfo: "",
    imagePath: require("../assets/stargazing.png"),
    bbq: "Only allowed after 6pm",
  },
  {
    id: "12",
    beachName: "Exercising at the gym",
    latitude: "50.715330",
    longitude: "-1.878462",
    latitudeParking: "50.717687",
    longitudeParking: "-1.881558",
    beachStatus: "Moderate-high",
    lifeguarded: "Yes",
    publicToilets: "Yes",
    parkingAvailability: "26",
    dogWalking: "No",
    cycling: "No",
    warningInfo: "",
    imagePath: require("../assets/gym.png"),
    bbq: "Only allowed after 6pm",
  },
];

const getBeaches = () => {
  return beaches;
};

export default getBeaches;
