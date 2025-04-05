"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Favorites = () => {
  const router = useRouter();
  const favoriteCryptos = useSelector((state) => state.favorites.cryptos);
  const favoriteCities = useSelector((state) => state.favorites.cities);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold text-center mb-6">⭐ My Favorites</h2>

      {/* Crypto Favorites */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">🚀 Favorite Cryptos</h3>
        {favoriteCryptos.length > 0 ? (
          <ul className="grid sm:grid-cols-3 gap-4">
            {favoriteCryptos.map((crypto) => (
              <li
                key={crypto}
                className="p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700"
                onClick={() => router.push(`/crypto/${crypto}`)}
              >
                <p className="text-xl font-semibold text-green-400">{crypto.toUpperCase()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No favorite cryptos added.</p>
        )}
      </div>

      {/* City Favorites */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">🌍 Favorite Cities</h3>
        {favoriteCities.length > 0 ? (
          <ul className="grid sm:grid-cols-3 gap-4">
            {favoriteCities.map((city) => (
              <li
                key={city}
                className="p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700"
                onClick={() => router.push(`/weather/${city}`)}
              >
                <p className="text-xl font-semibold text-blue-400 capitalize">{city}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No favorite cities added.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
