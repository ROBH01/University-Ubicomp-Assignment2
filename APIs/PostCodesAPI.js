async function fetchONSCode(latitude, longitude) {
  //console.log(latitude + " <<>> " + longitude);
  try {
    //TODO: Query for ONS code based on those coordinates:  **[result/0/codes/admin_district: E06000058]**
    let response = await fetch(
      `https://api.postcodes.io/postcodes/lon/${longitude}/lat/${latitude}`
    );
    let data = await response.json();
    let ONSCode = data.result[0].codes.admin_district;
    //console.log("ONS CODE IN POSTCODE: " + ONSCode);
    return ONSCode;
  } catch (error) {
    console.error(error);
  }
}

export default fetchONSCode;
