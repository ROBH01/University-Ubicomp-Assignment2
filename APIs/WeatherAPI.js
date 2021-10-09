/**
 * This API is used to retrieve the weather status for the user location
 * from the Open Weather API by using the latitude and longitude provided
 */
const openWeather = require('../credentials');
const OPEN_WEATHER_KEY = openWeather.API_KEY;

/**
 * Method used to obtain the weather data needed by using user's location
 * @param {number} latitude
 * @param {number} longitude
 */
async function getCurrentWeather(latitude, longitude) {
    try {
        let response = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${OPEN_WEATHER_KEY}&units=metric`,
        );
        let data = await response.json();

        // Getting weather information for the user location
        let currentTemperature = data.main.temp;
        let currentRealFeelTemp = data.main.feels_like;
        let currentHumidity = data.main.humidity;
        let currentTown = data.name;
        let currentCondition = data.weather[0].main;
        let currentCondIcon = data.weather[0].icon;
        let currentWindSpeed = data.wind.speed;

        let weatherData = [
            currentTemperature,
            currentRealFeelTemp,
            currentHumidity,
            currentCondition,
            currentTown,
            currentCondIcon,
            currentWindSpeed,
        ];
        return weatherData;
    } catch (error) {
        console.error(error);
    }
}

export default getCurrentWeather;
