import React, { useContext } from 'react';
import { WeekContext } from './App';

import { ReactComponent as Background } from './img/bg-blur.svg';
import { ReactComponent as Cloudy } from './img/weather/cloudy.svg';
import { ReactComponent as Rainy } from './img/weather/rainy.svg';
import { ReactComponent as Sunny } from './img/weather/sunny.svg';
import { ReactComponent as Stormy } from './img/weather/stormy.svg';

function Card({ day, weather, temp, rain, humidity, windSpeed, cloudCover }) {
  let weatherIcon;
  switch (weather) {
    case 'Rain':
      weatherIcon = <Rainy />;
      break;
    case 'Clear':
      weatherIcon = <Sunny />;
      break;
    case 'Storm':
      weatherIcon = <Stormy />;
      break;
    case 'Clouds':
      weatherIcon = <Cloudy />;
      break;
    default:
      weatherIcon = <Cloudy />;
  }
  
  return (
    <div className="card">
      <div className="card-date">
        <p>{day}</p>
      </div>
      <div className="card-header">
        <h3>{day}</h3>
        <div className="temperature">
          <p>{temp}°</p>
        </div>
        {weatherIcon}
      </div>
      <div className="card-details">
        <p>Rain: {rain || '0'} mm</p>
        <p>Humidity: {humidity}%</p>
        <p>Wind: {windSpeed} km/h</p>
        <p>Cloud Cover: {cloudCover}%</p>
      </div>
    </div>
  );
}

const WeatherP = () => {
  const [weekData] = useContext(WeekContext);

  if (!weekData || !weekData.list || weekData.list.length === 0) {
    return <div className="content">Loading data or no data available...</div>;
  }

  const todayIndex = new Date().getDay(); 
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const cards = weekData.list.slice(0, 5).map((data, index) => {
    const dayOfWeek = daysOfWeek[(todayIndex + index) % 7];
    const weather = data.weather[0].main;
    const temp = Math.round(data.main.temp);

    const rain = data.rain ? data.rain['3h'] : '0'; // Rain volume for the last 3 hours
    const humidity = data.main.humidity; // Humidity, %
    const windSpeed = (data.wind.speed * 3.6).toFixed(2); // Wind speed, converted to km/h and rounded to 2 decimal places
    const cloudCover = data.clouds.all; // Cloudiness, %

    return (
      <Card
        key={index}
        day={index === 0 ? 'Today' : dayOfWeek}
        weather={weather}
        temp={temp}
        rain={rain}
        humidity={humidity}
        windSpeed={windSpeed}
        cloudCover={cloudCover}
      />
    );
  });

  return (
    <div className="content">
      <div id="activities">
        <h1>Days</h1>
        <div id="card-array">{cards}</div>
      </div>
      <Background />
    </div>
  );
};

export default WeatherP;
