import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./slices/weatherSlice";
import cryptoReducer from "./slices/cryptoSlice";
import websocketReducer from "./slices/websocketSlice";
import newsReducer from "./slices/newsSlice"; // Import news slice
import websocketMiddleware from './middleware/websocketMiddleware';
import favoritesReducer from "./slices/favoriteSlice";  // Import favorites

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    crypto: cryptoReducer,
    news: newsReducer,
    websocket: websocketReducer,
    favorites : favoritesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(websocketMiddleware),
});

export default store;
