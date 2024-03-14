import React, { useState, useContext, useEffect } from 'react';
import { ReactComponent as MenuIcon } from '../img/menu_icons/menu.svg';
import { ReactComponent as RunIcon } from '../img/menu_icons/directions_run.svg';
import { ReactComponent as PollutionIcon } from '../img/menu_icons/Pollution 1.svg';
import { ReactComponent as WindIcon } from '../img/menu_icons/Wind 1.svg';
import { ReactComponent as CloudIcon } from '../img/menu_icons/cloud.svg';
import { DayContext, WeekContext, PageContext, CityContext } from '../App';
import axios from 'axios';

function Tooltip({ text }) {
  return (
    <p class="tooltip">
      {text}
    </p>
  );
}

function Nav() {

  const [page, setPage] = useContext(PageContext);

  return (
    <nav>
      <div id="selected" class={page}></div>
      <ul>
        <li><a onClick={() => setPage("dashboard-page")}><MenuIcon /></a><Tooltip text="Dashboard" /></li>
        <li><a onClick={() => setPage("activities-page")}><RunIcon /></a><Tooltip text="Activities" /></li>
        <li><a onClick={() => setPage("weather-page")}><CloudIcon /></a><Tooltip text="Weather" /></li>
        <li><a onClick={() => setPage("extreme-weather-page")}><WindIcon /></a><Tooltip text="Extreme Weather" /></li>
        <li><a onClick={() => setPage("pollution-page")}><PollutionIcon /></a><Tooltip text="Pollution" /></li>
      </ul>
    </nav>
  );
}

function Title() {

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

  return (
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
  );
}

const Header = () => {
  return (
    <header>
      <Nav />
      <Title />
      <div id="space"></div>
    </header>
  );
};
export default Header;