"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCryptoData } from "../../redux/slices/cryptoSlice";
import { addNotification } from "../../redux/slices/websocketSlice";
import Image from "next/image";

const CryptoDetails = () => {
  const { coin } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const { data, loading, error } = useSelector((state) => state.crypto);
  const { prices, increase } = useSelector((state) => state.websocket);

  useEffect(() => {
    dispatch(fetchCryptoData(coin));
    dispatch({ type: "websocket/connect", payload: { url: `wss://ws.coincap.io/prices?assets=${coin}` } });

    return () => {
      dispatch({ type: "websocket/disconnect" });
    };
  }, [dispatch, coin]);

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!data || !data[coin]) return <p className="text-center text-gray-400">No data found.</p>;

  const coinData = data[coin];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 p-6">
      <div className="w-full max-w-lg p-6 bg-gray-900 border border-gray-700 rounded-xl shadow-xl text-white">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Image src={`/${coin}.svg`} alt={coin} width={50} height={50} className="rounded-full shadow-lg" />
            <h2 className="text-3xl font-bold uppercase tracking-wide">{coin}</h2>
          </div>
          <button
            className="px-3 py-1 bg-red-400 hover:bg-red-500 text-black rounded-lg shadow"
            onClick={() =>
              dispatch(
                addNotification({
                  type: "price_alert",
                  message: `🌩️ ${coin} price dropped!`,
                })
              )
            }
          >
            ⚡ Alert
          </button>
        </div>

        {/* Data Section */}
        <div className="space-y-4">
          <p className="text-lg text-gray-300">
            💰 <span className="font-medium">Price:</span>{" "}
            <span className="text-green-400 font-semibold">${coinData.usd.toFixed(2)}</span>
          </p>

          <p className="text-lg text-gray-300">
            ⚡ <span className="font-medium">Live Price:</span>{" "}
            {prices[coin] ? (
              <span className={`font-semibold ${increase[coin] ? "text-green-400" : "text-red-400"}`}>
                ${prices[coin]} {increase[coin] ? "🟢" : "🔴"}
              </span>
            ) : (
              <span className="text-gray-500">Loading...</span>
            )}
          </p>

          <p className="text-lg text-gray-300">
            📉 <span className="font-medium">24h Change:</span>{" "}
            <span className={`font-semibold ${coinData.usd_24h_change >= 0 ? "text-green-400" : "text-red-400"}`}>
              {coinData.usd_24h_change.toFixed(2)}%
            </span>
          </p>

          <p className="text-lg text-gray-300">
            🏦 <span className="font-medium">Market Cap:</span>{" "}
            <span className="font-semibold">${coinData.usd_market_cap.toFixed(2)}</span>
          </p>
        </div>

        {/* Navigation Button */}
        <button
          className="mt-6 w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold shadow-lg"
          onClick={() => router.push("/crypto")}
        >
          🔙 Back to Cryptos
        </button>
      </div>
    </div>
  );
};

export default CryptoDetails;
