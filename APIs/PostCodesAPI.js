async function fetchONSCode(latitude, longitude) {
  try {
    let API_response = await fetch(
      `https://api.postcodes.io/postcodes?lon=${longitude}&lat=${latitude}`
    );
    let API_data = await API_response.json();
    let ONSCode = API_data.result[0].codes.admin_district;
    return ONSCode;
  } catch (error) {
    console.error(error);
  }
}

export default fetchONSCode;
