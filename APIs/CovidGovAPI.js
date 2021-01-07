/**
 * This API is used to retrieve the rate per 100k population
 * in the area the user is by using the ONS code provided
 */

async function fetchRolling100k(ONSCode) {
  const structure100k = {
    Name: "areaName",
    SevenDayRolling: "newCasesBySpecimenDateRollingRate",
    Date: "date",
  };

  const structureStatistics = {
    Name: "areaName",
    DailyCases: "newCasesBySpecimenDate",
    CumulativeCases: "cumCasesBySpecimenDate",
    DailyDeaths: "newDeaths28DaysByDeathDate",
    CumulativeDeaths: "cumDeaths28DaysByDeathDate",
    Date: "date",
  };

  try {
    let response100k = await fetch(
      `https://api.coronavirus.data.gov.uk/v1/data?filters=areaCode=${ONSCode}&structure=${JSON.stringify(
        structure100k
      )}`
    );

    let responseStatistics = await fetch(
      `https://api.coronavirus.data.gov.uk/v1/data?filters=areaCode=${ONSCode}&structure=${JSON.stringify(
        structureStatistics
      )}`
    );

    let data100k = await response100k.json();
    let dataStatistics = await responseStatistics.json();

    // Get rate per 100k population
    //console.log(data100k.data[0]);
    let rolling100k = data100k.data[0].SevenDayRolling;
    //console.log("Checking response: " + rolling100k);

    // Get other statistical data such as daily cases, cumulative cases and the area name queried
    console.log(dataStatistics.data[0]);
    let dailyCases = dataStatistics.data[0].DailyCases;
    let cumulativeCases = dataStatistics.data[0].CumulativeCases;
    let areaName = dataStatistics.data[0].Name;
    let dailyDeaths = dataStatistics.data[0].DailyDeaths;
    let cumulativeDeaths = dataStatistics.data[0].CumulativeDeaths;

    // Return all the data requested
    let covidAPIData = [
      rolling100k,
      dailyCases,
      cumulativeCases,
      areaName,
      dailyDeaths,
      cumulativeDeaths,
    ];

    return covidAPIData;
  } catch (error) {
    console.error(error);
  }
}

//TODO: Make another function that gathers today's status in the area e.g. cases, deaths, hospital admissions, area code?, more on GOV API WEBSITE

export default fetchRolling100k;
