"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePrice, addNotification, clearNotifications } from "../redux/slices/websocketSlice";
import { toast } from "react-hot-toast";

const WebSocketHandler = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.websocket.notifications);

  useEffect(() => {
    const ws = new WebSocket("wss://ws.coincap.io/prices?assets=bitcoin,ethereum");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      Object.keys(data).forEach((crypto) => {
        dispatch(updatePrice({ id: crypto, price: parseFloat(data[crypto]) }));
      });
    };

    return () => ws.close();
  }, [dispatch]);

  // 🚀 Handle notifications safely
  useEffect(() => {
    if (notifications.length > 0) {
      notifications.forEach((notif) => {
        if (notif.type === "price_alert") {
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-gray-900 border-l-4 ${
                notif.increase ? "border-green-500" : "border-red-500"
              } shadow-lg rounded-lg flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4 flex items-start">
                {/* Crypto Icon */}
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={"globe.svg"}
                    alt="Crypto Icon"
                  />
                </div>
        
                {/* Alert Content */}
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-white">
                    {notif.increase ? "📈 Price Increase" : "📉 Price Drop"}
                  </p>
                  <p className="mt-1 text-sm text-gray-300">
                    {notif.message}
                  </p>
                </div>
              </div>
        
              {/* Close Button */}
              <div className="flex border-l border-gray-700">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="p-4 text-gray-400 hover:text-white focus:outline-none"
                >
                  Dismiss
                </button>
              </div>
            </div>
          ));
        } else if (notif.type === "weather_alert") {
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-blue-100 border-l-4 border-blue-500 shadow-lg rounded-lg flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4 flex items-start">
                {/* Weather Icon */}
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={"globe.svg"}
                    alt="Weather Icon"
                  />
                </div>
        
                {/* Alert Content */}
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-blue-900">
                    🌦️ {"Weather Alert"}
                  </p>
                  <p className="mt-1 text-sm text-blue-700">{notif.message}</p>
                </div>
              </div>
        
              {/* Close Button */}
              <div className="flex border-l border-gray-300">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="p-4 text-blue-600 hover:text-blue-500 focus:outline-none"
                >
                  Dismiss
                </button>
              </div>
            </div>
          ));
        }
      });

      // ✅ Delay clearing notifications to prevent infinite loop
      setTimeout(() => {
        dispatch(clearNotifications());
      }, 1000);
    }
  }, [notifications, dispatch]);

  return null; // No UI, just listens for updates
};

export default WebSocketHandler;
