"use client";

import { useEffect } from "react";
import { useRouter,useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../../redux/slices/weatherSlice";

const CityWeather = () => {
  const { city } = useParams(); // Get the city from URL params
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.weather);

  useEffect(() => {
    console.log(city)
    if (city) {
      dispatch(fetchWeather([city])); // Fetch weather if not available
    } 
  }, [dispatch, city]);

  const weatherData = data[city];

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!weatherData) return <p className="text-center text-gray-400">No data found.</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-gray-800">{city}</h2>
      <p className="text-xl text-gray-700">{weatherData.weather[0].description}</p>

      <div className="mt-4 p-6 bg-white rounded-lg shadow-lg">
        <p className="text-2xl font-semibold">
          🌡 Temperature: {Math.round(weatherData.main.temp)}°K
        </p>
        <p>🌬 Wind Speed: {weatherData.wind.speed} m/s</p>
        <p>💧 Humidity: {weatherData.main.humidity}%</p>
        <p>🌅 Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
        <p>🌇 Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
      </div>

      <button
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
        onClick={() => router.push("/weather")}
      >
        Back to Search
      </button>
    </div>
  );
};

export default CityWeather;
