"use client";

import { useEffect, useState } from "react";
import { toggleFavoriteCrypto } from "../redux/slices/favoriteSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchCryptoData } from "../redux/slices/cryptoSlice";
import { addNotification } from "../redux/slices/websocketSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Crypto = () => {
  const dispatch = useDispatch();
  const [search,setSearch] = useState("")
  const [crypto,setCrypto] = useState("bitcoin")
  const { data, loading, error } = useSelector((state) => state.crypto);
  const { prices, increase } = useSelector((state) => state.websocket);
  const favoriteCryptos = useSelector((state) => state.favorites.cryptos);
  const router = useRouter();

  const livePrice = () =>  {
    const API_URL = `wss://ws.coincap.io/prices?assets=${crypto}`;
    dispatch({ type: "websocket/connect", payload: { url: API_URL } });

    return () => {
      dispatch({ type: "websocket/disconnect" });
    };
  } 

  useEffect(() => {
    dispatch(fetchCryptoData(crypto));
  }, [dispatch]);

  useEffect(() => {
    livePrice()
  }, [dispatch]);


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-8">
     
      <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl mt-5 font-semibold text-white mb-6">
                Crypto Updates
              </h2>
              <div className="flex justify-center items-center">
                <input
                  className="w-full sm:w-3/4 p-3 text-lg text-gray-700 bg-white bg-opacity-80 rounded-l-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Enter crypto('bitcoin,ethereum')"
                />
                <button
                  onClick={() => {
                    dispatch(fetchCryptoData(search));
                    setCrypto(search);
                    livePrice()
                  }}
                  className="p-3 bg-blue-500 text-white rounded-r-full shadow-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  🔍
                </button>
              </div>
            </div>
      

      {loading && <p className="text-center text-lg text-gray-400">Loading...</p>}
      {error && <p className="text-center text-lg text-red-500">Error: {error}</p>}

      {data && (
        <div className="grid sm:grid-cols-3 grid-cols-1 gap-6 max-w-6xl mt-5 mx-auto px-4">
          {Object.entries(data).map(([key, value]) => (
            <div
              key={key}
              className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg transition transform hover:scale-105 hover:bg-white/20 cursor-pointer"
              
            >
              <div className="flex items-center gap-3 mb-3">
                <Image src={key + ".svg"} alt={key} width={40} height={40} />
                <h3 className="text-2xl font-semibold hover:underline text-white" onClick={() => router.push("/crypto/" + key)}>{key.toUpperCase()}</h3>
                <button 
                  className="bg-red-300 rounded-lg p-1"
                  onClick={()=> {
                        dispatch(addNotification({
                          type: "price_alert",
                          message: `🌩️ ${key} price droppedd!`,
                        }));
                      }}>
                         Toast!!
                  </button>
              </div>
              <p className="text-gray-300">
                💰 Price: <span className="font-semibold text-green-400">${value.usd.toFixed(2)}</span>
              </p>
              <p className="text-gray-300">
                ⚡ Live Price:{" "}
                {prices[key] ? (
                  <span className={`font-semibold ${increase[key] ? "text-green-400" : "text-red-400"}`}>
                    ${prices[key]} {increase[key] ? "🟢" : "🔴"}
                  </span>
                ) : (
                  <span className="text-gray-500">Loading...</span>
                )}
              </p>
              <p className="text-gray-300">
                📉 24h Change:{" "}
                <span
                  className={`font-semibold ${
                    value.usd_24h_change >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {value.usd_24h_change.toFixed(2)}%
                </span>
              </p>
              <p className="text-gray-300">
                🏦 Market Cap: <span className="font-semibold">${value.usd_market_cap.toFixed(2)}</span>
              </p>
              {/* Add to Favorites Button */}
                            <button
                              className={`mt-4 px-4 py-2 rounded-lg transition-all ${
                                favoriteCryptos.includes(key.toLowerCase())
                                  ? "bg-yellow-400 text-black"
                                  : "bg-gray-600 text-white"
                              }`}
                              onClick={() => dispatch(toggleFavoriteCrypto(key.toLowerCase()))}
                            >
                              {favoriteCryptos.includes(key.toLowerCase()) ? "⭐ Favorited" : "☆ Add to Favorites"}
                            </button>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Crypto;
