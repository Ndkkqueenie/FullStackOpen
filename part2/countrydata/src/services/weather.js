import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const getWeather = (city) => {
  const url = `${BASE_URL}?q=${encodeURIComponent(city)}&APPID=${API_KEY}`;
  return axios.get(url)
    .then(response => response.data)
    .catch(error => {
      throw new Error('Error fetching weather data: ' + error.message);
    });
};

export default { getWeather };
