import './css/App.css';
import React from 'react';

import { ReactComponent as Background } from './img/bg-blur.svg';
import { ReactComponent as Cloudy } from './img/weather/cloudy.svg';
import { ReactComponent as Rainy } from './img/weather/rainy.svg';
import { ReactComponent as Sunny } from './img/weather/sunny.svg';
import { ReactComponent as Stormy } from './img/weather/stormy.svg';

function Card({ activity, icon, temperature }) {
  let className = "card-content";
  
  return (
    <div className="card">
      <div className={className}>
        {icon}
        <h3>{activity}</h3>
        <div className="temperature">
          <p>{temperature}°</p>
        </div>
      </div>
    </div>
  );
}

function WeekItem({ day, weatherIcon, temperature }) {
  return (
    <div className="week-item">
      <Card activity={day} icon={weatherIcon} temperature={temperature} />
    </div>
  );
}

const Dashboard = () => {
  return (
    <div className="content">
      <div id="activities">
        <h1>London</h1>
        <div id="card-array">
          <WeekItem day="Monday" weatherIcon={<Cloudy />} temperature={19} />
          <WeekItem day="Tuesday" weatherIcon={<Cloudy />} temperature={21} />
          <WeekItem day="Wednesday" weatherIcon={<Rainy />} temperature={16} />
          <WeekItem day="Thursday" weatherIcon={<Stormy />} temperature={3} />
          <WeekItem day="Friday" weatherIcon={<Sunny />} temperature={30} />
        </div>
      </div>
      <Background />
    </div> 
  );
};

export default Dashboard;
