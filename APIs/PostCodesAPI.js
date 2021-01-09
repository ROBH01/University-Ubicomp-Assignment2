/**
 * This API is used to retrieve the ONS code for the location the user
 * is at by using the latitude and longitude provided
 */

/**
 * Method used to retrieve the ONS area code based on user's location
 * @param {} latitude
 * @param {} longitude
 */
async function fetchONSCode(latitude, longitude) {
  try {
    let API_response = await fetch(
      `https://api.postcodes.io/postcodes?lon=${longitude}&lat=${latitude}`
    );
    let API_data = await API_response.json();
    //console.log("Checking ONS API");
    //console.log(API_data);
    let ONSCode = API_data.result[0].codes.admin_district;
    return ONSCode;
  } catch (error) {
    console.error(error);
  }
}

export default fetchONSCode;
