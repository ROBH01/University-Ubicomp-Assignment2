/**
 * This API is used to retrieve the ONS code for the location the user
 * is located by using the latitude and longitude provided
 */

/**
 * Retrieves the ONS area code based on user's location
 * @param {number} latitude
 * @param {number} longitude
 */
async function fetchONSCode(latitude, longitude) {
  try {
    let API_response = await fetch(`https://api.postcodes.io/postcodes?lon=${longitude}&lat=${latitude}`);
    let API_data = await API_response.json();
    let ONSCode = API_data.result[0].codes.admin_district;
    return ONSCode;
  } catch (error) {
    console.error(error);
  }
}

export default fetchONSCode;
