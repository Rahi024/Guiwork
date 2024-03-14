import '../css/App.css';
import React, { useContext } from 'react';
import { ReactComponent as Cloudy } from '../img/weather/cloudy.svg';
import { ReactComponent as Rainy } from '../img/weather/rainy.svg';
import { ReactComponent as Sunny } from '../img/weather/sunny.svg';
import { ReactComponent as Stormy } from '../img/weather/stormy.svg';
import { ReactComponent as Background } from '../img/bg.svg';
import { ReactComponent as RainyWeek } from '../img/weather/week/Rainy.svg';
import { ReactComponent as SunWeek } from '../img/weather/week/Sun.svg';
import { ReactComponent as StormyWeek } from '../img/weather/week/Stormy.svg';
import { ReactComponent as CloudyWeek } from '../img/weather/week/Cloudy.svg';
import { WeekContext, DayContext } from '../App';

function TodayWeather() {

  const [weatherData, setWeatherData] = useContext(DayContext);

  let temperature = 0;
  let feelsLike = 0;
  let weather = "No Data";
  if (weatherData != null) {
    temperature = Math.round(weatherData.main.temp);
    feelsLike = weatherData.main.feels_like;
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
    <div id="today-weather">
      <div id="today-weather-text">
        <section id="title">
          <h1>Today</h1>
          <p>Feels like {feelsLike}°</p>
        </section>
        <h1 id="temperature">{temperature}°</h1>
      </div>
      {weatherComponent}
    </div>
  );
}

function WeekItem({ day, weather, temp }) {
  let weatherComponent = <CloudyWeek />;

  if (weather === "Rain") {
    weatherComponent = <RainyWeek />;
  } else if (weather === "Clear") {
    weatherComponent = <SunWeek />;
  } else if (weather === "Storm") {
    weatherComponent = <StormyWeek />;
  } else if (weather === "Clouds") {
    weatherComponent = <CloudyWeek />;
  }

  return (
    <div class="week-item">
      <div class="week-item-divider"></div>
      <div class="week-item-content">
        <div class="week-item-text">
          <h3>{day}</h3>
          <p>{weather}<br />{temp}°</p>
        </div>
        {weatherComponent}
      </div>
    </div>
  );
}

function Forecast() {

  const [weekData, setWeekData] = useContext(WeekContext);

  // Get the next 4 days
  var now = new Date();
  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var day = [days[now.getDay() + 1], days[now.getDay() + 2], days[now.getDay() + 3], days[now.getDay() + 4]];

  // Get the weather and temperature for the next 4 days
  let weathers = ["No Data", "No Data", "No Data", "No Data"];
  let temperatures = [0, 0, 0, 0];
  if (weekData != null) {
    for (let i = 0; i < 4; i++) {
      weathers[i] = weekData.list[i].weather[0].main;
      temperatures[i] = Math.round(weekData.list[i].main.temp);
    }
  }

  return (
    <div id="forecast">
      <WeekItem day={day[0]} weather={weathers[0]} temp={temperatures[0]} />
      <WeekItem day={day[1]} weather={weathers[1]} temp={temperatures[1]} />
      <WeekItem day={day[2]} weather={weathers[2]} temp={temperatures[2]} />
      <WeekItem day={day[3]} weather={weathers[3]} temp={temperatures[3]} />
    </div>
  );
}

const Dashboard = () => {
  return (
    <div class="content">
      <div id="dashboard">
        <TodayWeather />
        <Forecast />
        <Background />
      </div>
    </div>
  );
};
export default Dashboard;