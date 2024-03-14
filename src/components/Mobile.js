import '../css/App.css';
import React, { useState, useContext, useEffect } from 'react';
import { ReactComponent as Background } from '../img/bg-mobile.svg';

import { ReactComponent as Cloudy } from '../img/weather/cloudy.svg';
import { ReactComponent as Rainy } from '../img/weather/rainy.svg';
import { ReactComponent as Sunny } from '../img/weather/sunny.svg';
import { ReactComponent as Stormy } from '../img/weather/stormy.svg';

import { ActivityCard } from './ActivityCard';
import { getIdeals } from './IdealsHelper';

import { DayContext, WeekContext, CityContext } from '../App';
import axios from 'axios';

function CardArray() {
  const [weatherData, setWeatherData] = useContext(DayContext);
  let ideals = ["Ideal", "Ideal", "Ideal", "Ideal", "Ideal", "Ideal", "Ideal"];

  if (weatherData != null) {
    let temperature = Math.round(weatherData.main.temp);
    let weather = weatherData.weather[0].main; // Clear, Rain, Clouds
    let visibility = weatherData.visibility; // Maximum 10km is shown as 10000
    let windSpeed = weatherData.wind.speed; // shown in meter/sec
    let humidity = weatherData.main.humidity; // humidity 100%
    ideals = getIdeals(temperature, weather, visibility, windSpeed, humidity);
  }
  return (
    <div className='card-array'>
      <ActivityCard activity="Running" ideal={ideals[0]} />
      <ActivityCard activity="Camping" ideal={ideals[1]} />
      <ActivityCard activity="Fishing" ideal={ideals[2]} />
      <ActivityCard activity="Hiking" ideal={ideals[3]} />
      <ActivityCard activity="Watersport" ideal={ideals[4]} />
      <ActivityCard activity="Skiing" ideal={ideals[5]} />
      <ActivityCard activity="Stargazing" ideal={ideals[6]} />
    </div>
  );
}

const Mobile = () => {

  const [city, setCity] = useContext(CityContext);
  const [weatherData, setWeatherData] = useContext(DayContext);
  const [weekData, setWeekData] = useContext(WeekContext);
  const [isLoading, setIsLoading] = useState('loading');

  const fetchData = async () => {
    setIsLoading('loading');
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=717fad74b9058562c326494dcbd56f58`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast/?q=${city}&units=metric&appid=717fad74b9058562c326494dcbd56f58`
      );
      setWeekData(response.data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(null);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleInputChange = (e) => {
    setCity(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  let temperature = 0;
  let feelsLike = 0;
  let hi = 0;
  let lo = 0;
  let weather = "No Data";
  if (weatherData != null) {
    temperature = Math.round(weatherData.main.temp);
    feelsLike = weatherData.main.feels_like;
    hi =Math.round( weatherData.main.temp_max);
    lo = Math.round(weatherData.main.temp_min);
    weather = weatherData.weather[0].main;
  }

  let weatherComponent = <Cloudy />;

  if (weather === "Rain") {
    weatherComponent = <Rainy />;
  } else if (weather === "Clear") {
    weatherComponent = <Sunny />;
  } else if (weather === "Storm") {
    weatherComponent = <Stormy />;
  } else if (weather === "Clouds") {
    weatherComponent = <Cloudy />;
  }

  return (
    <div id='mobile'>
       <form onSubmit={handleSubmit}>
      {/* <select id="dropdown" value={city} onChange={handleSubmit}></select> */}
      <fieldset>
        <input type="text" value={city} onChange={handleInputChange}></input>
        <button type='submit' className={isLoading}>
          <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
            <path d="M32 16.5C32 25.0604 25.0604 32 16.5 32C7.93959 32 1 25.0604 1 16.5C1 7.93959 7.93959 1 16.5 1C25.0604 1 32 7.93959 32 16.5Z" fill="#A1B4D7" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.6667 21C12.7211 21 10.3333 18.6122 10.3333 15.6667C10.3333 12.7211 12.7211 10.3333 15.6667 10.3333C18.6122 10.3333 21 12.7211 21 15.6667C21 16.8991 20.5819 18.034 19.8799 18.9371L23.4714 22.5286L22.5286 23.4714L18.9371 19.8799C18.034 20.5819 16.8991 21 15.6667 21ZM19.6667 15.6667C19.6667 17.8758 17.8758 19.6667 15.6667 19.6667C13.4575 19.6667 11.6667 17.8758 11.6667 15.6667C11.6667 13.4575 13.4575 11.6667 15.6667 11.6667C17.8758 11.6667 19.6667 13.4575 19.6667 15.6667Z" fill="#444444" />
            <path d="M32 16.5C32 25.0604 25.0604 32 16.5 32C7.93959 32 1 25.0604 1 16.5C1 7.93959 7.93959 1 16.5 1C25.0604 1 32 7.93959 32 16.5Z" stroke="#444444" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.6667 21C12.7211 21 10.3333 18.6122 10.3333 15.6667C10.3333 12.7211 12.7211 10.3333 15.6667 10.3333C18.6122 10.3333 21 12.7211 21 15.6667C21 16.8991 20.5819 18.034 19.8799 18.9371L23.4714 22.5286L22.5286 23.4714L18.9371 19.8799C18.034 20.5819 16.8991 21 15.6667 21ZM19.6667 15.6667C19.6667 17.8758 17.8758 19.6667 15.6667 19.6667C13.4575 19.6667 11.6667 17.8758 11.6667 15.6667C11.6667 13.4575 13.4575 11.6667 15.6667 11.6667C17.8758 11.6667 19.6667 13.4575 19.6667 15.6667Z" stroke="#444444" />
          </svg>
        </button>
      </fieldset>
    </form>
      <div className='content'>
        <div className='content-text'>
          <h1>Today</h1>
          <h2>{temperature}°</h2>
        </div>
        {weatherComponent}
        <div className='content-subtext'>
          <h3>Feels like {feelsLike}°</h3>
          <p>H:{hi}° L:{lo}°</p>
        </div>
        <CardArray />
      </div>
      <Background />
      <footer>
        <a href='#'>
          <svg xmlns="http://www.w3.org/2000/svg" width="78" height="6" viewBox="0 0 78 6" fill="none">
            <path d="M3.10254 3L74.8974 3.00001" stroke="url(#paint0_linear_59_2057)" stroke-width="6" stroke-linecap="round" />
            <defs>
              <linearGradient id="paint0_linear_59_2057" x1="39" y1="3" x2="39" y2="4" gradientUnits="userSpaceOnUse">
                <stop stop-color="#07FFFF" />
                <stop stop-color="#4CE0E0" />
              </linearGradient>
            </defs>
          </svg>
        </a>
      </footer>
    </div>
  );
};
export default Mobile;
