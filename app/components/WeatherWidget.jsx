// to install dependencies run:
// npm install swr framer-motion @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/fontawesome-svg-core

'use client'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import {
  faCloudSun,
  faCloud,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSun,
  faSmog,
  faBolt,
} from '@fortawesome/free-solid-svg-icons';

export default function WeatherWidget({data,city},error) {
  const [useCelsius, setCelsius] = useState(true);
    console.log(city)
  if (error) return <div>Failed to load weather data</div>;
  if (!data) return <div>Loading...</div>;

  const { weather, main} = data;
  const { temp } = main;
  const { description } = weather[0];

  const kelvinToCelsius = (temp) => {
    return temp - 273.15; // Convert from Kelvin to Celsius
  };

  const celsius = kelvinToCelsius(temp);
  const fahrenheit = (celsius * 9) / 5 + 32;

  const toggleTemperature = () => setCelsius((celsius) => !celsius);

  const weatherIcons = {
    Snow: faSnowflake,
    Thunderstorm: faBolt,
    Rain: faCloudShowersHeavy,
    Drizzle: faCloudRain,
    Mist: faSmog,
    Clear: faSun,
    Haze: faSun,
    Clouds: faCloud,
  };

  const icon = weatherIcons[description] || faCloud;

  return (
    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <FontAwesomeIcon icon={icon} className="mr-2" />
      It's currently{' '}
      {(celsius < 8 && <span className="mr-1">❄️</span>) ||
        (celsius > 30 && <span className="mr-1">🔥</span>)}
      <span onMouseOver={toggleTemperature} onMouseLeave={toggleTemperature} className="font-bold">
        {useCelsius ? `${Math.round(celsius)} °C` : `${Math.round(fahrenheit)} °F`}
      </span>{' '}
      <span className="text-xs">({description})</span> in{' '}
      <span className="font-bold focus:outline-none transition duration-300 ease-in-out hover:text-indigo-900 dark:hover:text-indigo-200">
        {city}
      </span>
      .
    </motion.p>
  );
}