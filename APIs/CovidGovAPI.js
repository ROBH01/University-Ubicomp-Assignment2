/**
 * This API is used to retrieve the rate per 100k population
 * in the area the user is by using the ONS code provided
 */

/**
 * Method used to retrieve all the necessary Covid-19 data from gov.uk API
 * @param {} ONSCode area code
 */
async function fetchCovid19Data(ONSCode) {
  const structureRolling100k = {
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

  const structureNationalStatistics = {
    DailyCases: "newCasesByPublishDate",
    CumulativeCases: "cumCasesByPublishDate",
    DailyDeaths: "newDeaths28DaysByPublishDate",
    CumulativeDeaths: "cumDeaths28DaysByPublishDate",
    Date: "date",
  };

  try {
    let response100k = await fetch(
      `https://api.coronavirus.data.gov.uk/v1/data?filters=areaCode=${ONSCode}&structure=${JSON.stringify(
        structureRolling100k
      )}`
    );

    let responseStatistics = await fetch(
      `https://api.coronavirus.data.gov.uk/v1/data?filters=areaCode=${ONSCode}&structure=${JSON.stringify(
        structureStatistics
      )}`
    );

    let responseNationalStatistics = await fetch(
      `https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=overview&structure=${JSON.stringify(
        structureNationalStatistics
      )}`
    );

    let data100k = await response100k.json();
    let dataStatistics = await responseStatistics.json();
    let dataNationalStatistics = await responseNationalStatistics.json();

    // Get rate per 100k population
    //console.log(data100k.data[0]);
    let rolling100k = data100k.data[0].SevenDayRolling;
    //console.log("Checking response: " + rolling100k);

    // Get other statistical data such as daily cases, cumulative cases and the area name queried
    //console.log(dataStatistics.data[0]);
    let dailyCases = dataStatistics.data[0].DailyCases;
    let cumulativeCases = dataStatistics.data[0].CumulativeCases;
    let areaName = dataStatistics.data[0].Name;
    let dailyDeaths = dataStatistics.data[0].DailyDeaths;
    let cumulativeDeaths = dataStatistics.data[0].CumulativeDeaths;

    // Get national statistics
    //console.log(dataNationalStatistics.data[0]);
    let dailyNationalCases = dataNationalStatistics.data[0].DailyCases;
    let cumulativeNationalCases =
      dataNationalStatistics.data[0].CumulativeCases;
    let dailyNationalDeaths = dataNationalStatistics.data[0].DailyDeaths;
    let cumulativeNationalDeaths =
      dataNationalStatistics.data[0].CumulativeDeaths;
    let nationalResultsDate = dataNationalStatistics.data[0].Date;

    // Return all the data requested
    let covidAPIData = [
      rolling100k,
      dailyCases,
      cumulativeCases,
      areaName,
      dailyDeaths,
      cumulativeDeaths,
      dailyNationalCases,
      cumulativeNationalCases,
      dailyNationalDeaths,
      cumulativeNationalDeaths,
      nationalResultsDate,
    ];

    return covidAPIData;
  } catch (error) {
    console.error(error);
  }
}

export default fetchCovid19Data;
