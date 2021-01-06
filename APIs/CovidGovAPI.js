/**
 * This API is used to retrieve the rate per 100k population
 * in the area the user is by using the ONS code provided
 */

async function fetchRolling100k(ONSCode) {
  try {
    let response = await fetch(
      `https://api.coronavirus.data.gov.uk/v1/data?filters=areaCode=${ONSCode}&structure={"name":"areaName","SevenDayRolling":"newCasesBySpecimenDateRollingRate","Date":"date"}`
    );
    let data = await response.json();
    //console.log(data.data[0]);
    let rolling100k = data.data[0].SevenDayRolling; // only getting the number of 7 day rolling
    //console.log("Checking response: " + rolling100k);
    return rolling100k;
  } catch (error) {
    console.error(error);
  }
}

//TODO: Make another function that gathers today's status in the area e.g. cases, deaths, hospital admissions, area code?, more on GOV API WEBSITE

export default fetchRolling100k;
