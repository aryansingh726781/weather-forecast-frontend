
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState('metric');
  const [background, setBackground] = useState('');

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`https://weather-forecast-backend-78wr.onrender.com/api/weather/${city}`);
      setWeather(response.data);
      setBackground(getBackground(response.data.weather[0].main));
    } catch (error) {
      alert('City not found');
    }
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  const getBackground = (condition) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return 'clear-sky';
      case 'clouds':
        return 'cloudy';
      case 'rain':
        return 'rainy';
      case 'snow':
        return 'snowy';
      case 'mist':
      case 'haze':
      case 'fog':
        return 'misty';
      default:
        return 'default';
    }
  };

  return (
    <div className="app">
      <div className={`weather-card ${background}`}>
        <h1>Weather Dashboard</h1>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeather}>Get Weather</button>
        </div>
        <button className="toggle-button" onClick={toggleUnit}>
          Toggle to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
        </button>
        {weather && (
          <div className="weather-info">
            <h2>{weather.name}</h2>
            <div className="weather-details">
              <div className="weather-box">
                <p>Temperature: <span>{unit === 'metric' ? `${weather.main.temp}°C` : `${weather.main.temp}°F`}</span></p>
              </div>
              <div className="weather-box">
                <p>Min Temp: <span>{weather.main.temp_min}°C</span></p>
              </div>
              <div className="weather-box">
                <p>Max Temp: <span>{weather.main.temp_max}°C</span></p>
              </div>
              <div className="weather-box">
                <p>Humidity: <span>{weather.main.humidity}%</span></p>
              </div>
              <div className="weather-box">
                <p>Wind Speed: <span>{weather.wind.speed} m/s</span></p>
              </div>
              <div className="weather-box">
                <p>Condition: <span>{weather.weather[0].description}</span></p>
              </div>
            </div>
            <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="weather icon" />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

