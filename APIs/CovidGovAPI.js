async function fetchSpecimen(ONSCode) {
  try {
    //TODO: Query for specimen based on ONS code
    let response = await fetch(
      `https://api.coronavirus.data.gov.uk/v1/data?filters=areaCode=${ONSCode}&structure={"name":"areaName","SevenDayRolling":"newCasesBySpecimenDateRollingRate","Date":"date"}`
    );
    let data = await response.json();
    //console.log(data.data[0]);
    let specimen = data.data[0];
    //let ONSCode = data.result[0].codes.admin_district;
    //console.log(ONSCode);
    //return ONSCode;
    return specimen;
  } catch (error) {
    console.error(error);
  }
}

export default fetchSpecimen;
