import '../css/App.css';
import React from 'react';
import { ReactComponent as Cloudy } from '../img/weather/cloudy.svg';
import { ReactComponent as Windy } from '../img/menu_icons/Wind 1.svg'
import { ReactComponent as HeatwaveIcon } from '../img/extreme_weather_icons/heatwave.svg'
import { ReactComponent as Background } from '../img/bg-blur.svg';

function ExtremeCard() {
  return (
    <div class="extreme-card">
      <div class="extreme-card-content">
        <HeatwaveIcon />
        <h3>Heatwave</h3>
      </div>
    </div>
  );
}

function ExtremeDetails() {
  return (
    <div class="extreme-details">
      <h3>Details</h3>
    </div>
  )
}

function Extremes() {
  return (
    <div id="extreme">
        <div id="extreme-text">
            <section id="title">
                {/* < ExtremeCard /> */}
            </section>
        </div>
    </div>
  );
}

const ExtremeWeather = () => {

  return (
      <div id="extreme-weather">
        <h1>Extreme Weather</h1>
        <div id="extreme-content">
          <ExtremeCard />
          <ExtremeDetails />
        </div>
        <Background />
      </div>
  );
};
export default ExtremeWeather;