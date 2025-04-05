"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../redux/slices/weatherSlice";
import WeatherWidget from "../components/WeatherWidget";
import { useRouter } from "next/navigation";
import { addNotification } from "../redux/slices/websocketSlice";
import { toggleFavoriteCity } from "../redux/slices/favoriteSlice";

const getBackgroundClass = (weatherCondition) => {
  switch (weatherCondition?.toLowerCase()) {
    case "clear":
      return "bg-blue-400"; // Clear skies
    case "clouds":
      return "bg-gray-400"; // Cloudy
    case "rain":
      return "bg-blue-600"; // Rainy
    case "snow":
      return "bg-gray-200"; // Snowy
    case "thunderstorm":
      return "bg-indigo-700"; // Stormy
    case "drizzle":
      return "bg-blue-300"; // Drizzle
    case "mist":
    case "fog":
      return "bg-gray-300"; // Mist/Fog
    default:
      return "bg-gray-400"; // Default background
  }
};

const Weather = () => {
  const router = useRouter();
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState("");
  const favoriteCities = useSelector((state) => state.favorites.cities);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.weather);

  useEffect(() => {
    dispatch(fetchWeather(cities));
  }, [dispatch]);

  const firstCityWeather = data[cities[0]]?.weather?.[0]?.main || "default";
  const bgClass = getBackgroundClass(firstCityWeather);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${bgClass} p-6`}>
      {/* Search Section */}
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl mt-5 font-semibold text-white mb-6">
          Weather Updates
        </h2>
        <div className="flex justify-center items-center">
          <input
            className="w-full sm:w-3/4 p-3 text-lg text-gray-700 bg-white bg-opacity-80 rounded-l-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Enter cities (e.g., New York, Tokyo, Denver)"
          />
          <button
            onClick={() => {
              const cityArray = search.split(",").map((city) => city.trim());
              dispatch(fetchWeather(cityArray));
              setCities(cityArray);
            }}
            className="p-3 bg-blue-500 text-white rounded-r-full shadow-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            🔍
          </button>
        </div>
      </div>

      {/* Weather Cards Section */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((city) => (
          <div
            key={city}
            className="p-6 bg-white bg-opacity-30 backdrop-blur-lg rounded-xl shadow-lg transform transition duration-500 hover:scale-105 cursor-pointer"
          >
            <h3 className="text-2xl hover:underline font-bold text-black text-center mb-4" 
            onClick={() => router.push("/weather/" + city)}
            >
              {city}
            </h3>
            {loading && <p className="text-white text-center">Loading...</p>}
            {error && <p className="text-red-500 text-center">Error: {error}</p>}
            {data[city]?.main && (
              <div className="text-center">
                <p className="text-4xl font-semibold text-black">
                  {Math.round(data[city].main.temp)}°K
                </p>
                <WeatherWidget data={data[city]} city={city} error={error} />
                {/* Add to Favorites Button */}
                <button
                    className={`mt-4 px-4 py-2 rounded-lg transition-all ${
                    favoriteCities.includes(city.toLowerCase())
                        ? "bg-yellow-400 text-black"
                        : "bg-gray-600 text-white"
                    }`}
                    onClick={() => dispatch(toggleFavoriteCity(city.toLowerCase()))}
                >
                    {favoriteCities.includes(city.toLowerCase()) ? "⭐ Favorited" : "☆ Add to Favorites"}
                </button>
                <button 
                  className="bg-red-300 rounded-lg p-2"
                  onClick={()=> {
                        dispatch(addNotification({
                          type: "weather_alert",
                          message: `🌩️ ${city} has rain coming!`,
                        }));
                      }}>
                          Toast!!
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Weather;
