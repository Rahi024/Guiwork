import '../css/App.css';
import React, { useContext } from 'react';

import { ReactComponent as Background } from '../img/bg-blur.svg';
import { getIdeals } from './IdealsHelper';

// Week Imports
import { ReactComponent as WeekRun } from '../img/activity_icons/week_icons/directions_run.svg';
import { ReactComponent as WeekCamping } from '../img/activity_icons/week_icons/camping.svg';
import { ReactComponent as WeekSkiing } from '../img/activity_icons/week_icons/downhill_skiing.svg';
import { ReactComponent as WeekFishing } from '../img/activity_icons/week_icons/fishing.svg';
import { ReactComponent as WeekHiking } from '../img/activity_icons/week_icons/hiking.svg';
import { ReactComponent as WeekSurfing } from '../img/activity_icons/week_icons/surfing.svg';
import { ReactComponent as WeekStar } from '../img/activity_icons/week_icons/star.svg';

// Weather Imports
import { ReactComponent as RainyWeek } from '../img/weather/week/Rainy.svg';
import { ReactComponent as SunWeek } from '../img/weather/week/Sun.svg';
import { ReactComponent as StormyWeek } from '../img/weather/week/Stormy.svg';
import { ReactComponent as CloudyWeek } from '../img/weather/week/Cloudy.svg';
import { DayContext, WeekContext } from '../App';
import { ActivityCard } from './ActivityCard';

function WeekItem({ day, weather, temp, levels }) {

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
    <div className='week-item'>
      <div className='v-div'></div>
      <div className='week-item-content'>
        <div className='week-weather'>
          <div className='week-weather-text'>
            <h1>{day}</h1>
            <p>{weather}<br />{temp}°</p>
          </div>
          {weatherComponent}
        </div>
        <div className='week-activity-icons'>
          {levels[0] == 'Ideal' ? <WeekRun /> : null}
          {levels[1] == 'Ideal' ? <WeekCamping /> : null}
          {levels[2] == 'Ideal' ? <WeekFishing /> : null}
          {levels[3] == 'Ideal' ? <WeekHiking /> : null}
          {levels[4] == 'Ideal' ? <WeekSurfing /> : null}
          {levels[5] == 'Ideal' ? <WeekSkiing /> : null}
          {levels[6] == 'Ideal' ? <WeekStar /> : null}
          <div className='icon-holder'></div>
          {(levels[0] == 'Ideal' || levels[1] == 'Ideal' || levels[2] == 'Ideal' ||
          levels[3] == 'Ideal' || levels[4] == 'Ideal' || levels[5] == 'Ideal' ||
          levels[6] == 'Ideal') ? <div className='tooltip'><p>Ideal Activities</p></div> : null}
        </div>
      </div>
    </div>
  );

}

function GetWeek() {
  const [weekData, setWeekData] = useContext(WeekContext);
  let ideals = null;

  // Get the next 4 days
  var now = new Date();
  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var day = [days[now.getDay() + 1], days[now.getDay() + 2], days[now.getDay() + 3], days[now.getDay() + 4], days[now.getDay() + 5]];

  // Get the weather and temperature for the next 4 days
  let weathers = ["No Data", "No Data", "No Data", "No Data", "No Data"];
  let temperatures = [0, 0, 0, 0, 0];
  if (weekData != null) {
    for (let i = 0; i < 5; i++) {
      weathers[i] = weekData.list[i].weather[0].main;
      temperatures[i] = Math.round(weekData.list[i].main.temp);
    }

    ideals = [["Warning", "Warning", "Warning", "Warning", "Warning", "Warning", "Warning"],
    ["Warning", "Warning", "Warning", "Warning", "Warning", "Warning", "Warning"],
    ["Warning", "Warning", "Warning", "Warning", "Warning", "Warning", "Warning"],
    ["Warning", "Warning", "Warning", "Warning", "Warning", "Warning", "Warning"],
    ["Warning", "Warning", "Warning", "Warning", "Warning", "Warning", "Warning"]];
    for (let i = 0; i < 5; i++) {
      //temperature, weather, visibility, windSpeed, humidity
      ideals[i] = getIdeals(
        weekData.list[i].main.temp,
        weekData.list[i].weather[0].main,
        weekData.list[i].visibility,
        weekData.list[i].wind.speed,
        weekData.list[i].main.humidity);
    }
  }

  return (
    <div id="weekly-activities">
      <div id="weekly-activity-content">
        <h2>Weekly Overview</h2>
        <div id="activity-forecast">
          <WeekItem day={day[0]} weather={weathers[0]} temp={temperatures[0]} levels={ideals[0]} />
          <WeekItem day={day[1]} weather={weathers[1]} temp={temperatures[1]} levels={ideals[1]} />
          <WeekItem day={day[2]} weather={weathers[2]} temp={temperatures[2]} levels={ideals[2]} />
          <WeekItem day={day[3]} weather={weathers[3]} temp={temperatures[3]} levels={ideals[3]} />
          <WeekItem day={day[4]} weather={weathers[4]} temp={temperatures[4]} levels={ideals[4]} />
        </div>
      </div>
    </div>
  );
}

const Activities = () => {
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
    <div class="content">
      <div id="activities">
        <h1>Activities</h1>
        <div id="card-array">
          
          <ActivityCard activity="Running" ideal={ideals[0]} />
          <ActivityCard activity="Camping" ideal={ideals[1]} />
          <ActivityCard activity="Fishing" ideal={ideals[2]} />
          <ActivityCard activity="Hiking" ideal={ideals[3]} />
          <ActivityCard activity="Watersport" ideal={ideals[4]} />
          <ActivityCard activity="Skiing" ideal={ideals[5]} />
          <ActivityCard activity="Stargazing" ideal={ideals[6]} />
        </div>
        <GetWeek />
        <Background />
      </div>
    </div>
  );
};
export default Activities;