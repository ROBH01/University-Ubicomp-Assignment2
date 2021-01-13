/**
 * This API is used to retrieve the rate per 100k population and other
 * Covid-19 related information such as the number of cases and deaths
 * in the user's area as well as nationwide, by using the ONS code provided
 */

/**
 * Method used to retrieve all the necessary Covid-19 data from Gov.uk API
 * @param {number} ONSCode area code
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
      `https://api.coronavirus.data.gov.uk/v1/data?filters=areaCode=${ONSCode}&structure=${JSON.stringify(structureRolling100k)}`
    );

    let responseStatistics = await fetch(
      `https://api.coronavirus.data.gov.uk/v1/data?filters=areaCode=${ONSCode}&structure=${JSON.stringify(structureStatistics)}`
    );

    let responseNationalStatistics = await fetch(
      `https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=overview&structure=${JSON.stringify(structureNationalStatistics)}`
    );

    let data100k = await response100k.json();
    let dataStatistics = await responseStatistics.json();
    let dataNationalStatistics = await responseNationalStatistics.json();

    // Get rate per 100k population
    let rolling100k = data100k.data[0].SevenDayRolling;

    // Get other statistical data
    let dailyCases = dataStatistics.data[0].DailyCases;
    let cumulativeCases = dataStatistics.data[0].CumulativeCases;
    let areaName = dataStatistics.data[0].Name;
    let dailyDeaths = dataStatistics.data[0].DailyDeaths;
    let cumulativeDeaths = dataStatistics.data[0].CumulativeDeaths;

    // Get national statistics
    let dailyNationalCases = dataNationalStatistics.data[0].DailyCases;
    let cumulativeNationalCases = dataNationalStatistics.data[0].CumulativeCases;
    let dailyNationalDeaths = dataNationalStatistics.data[0].DailyDeaths;
    let cumulativeNationalDeaths = dataNationalStatistics.data[0].CumulativeDeaths;

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
    ];

    return covidAPIData;
  } catch (error) {
    console.error(error);
  }
}

export default fetchCovid19Data;
