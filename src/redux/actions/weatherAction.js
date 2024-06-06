// actions/weatherActions.js
import {
    FETCH_WEATHER_REQUEST,
    FETCH_WEATHER_SUCCESS,
    FETCH_WEATHER_FAILURE,
  } from '../weatherTypes';
  
  export const fetchWeatherRequest = () => ({
    type: FETCH_WEATHER_REQUEST,
  });
  
  export const fetchWeatherSuccess = (weatherData) => ({
    type: FETCH_WEATHER_SUCCESS,
    payload: weatherData,
  });
  
  export const fetchWeatherFailure = (error) => ({
    type: FETCH_WEATHER_FAILURE,
    payload: error,
  });
  
  export const fetchWeather = (latitude, longitude) => {
    return async (dispatch) => {
      dispatch(fetchWeatherRequest());
      try {
        const apiKey = '78496c169e018504551ca115012422d2'; // Replace with your actual API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        dispatch(fetchWeatherSuccess(data));
      } catch (error) {
        dispatch(fetchWeatherFailure('Error fetching weather data'));
      }
    };
  };