import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    cryptos: [], // Favorite cryptocurrencies
    cities: [],  // Favorite cities
  },
  reducers: {
    toggleFavoriteCrypto: (state, action) => {
      const crypto = action.payload;
      if (state.cryptos.includes(crypto)) {
        state.cryptos = state.cryptos.filter((item) => item !== crypto);
      } else {
        state.cryptos.push(crypto);
      }
    },
    toggleFavoriteCity: (state, action) => {
      const city = action.payload;
      if (state.cities.includes(city)) {
        state.cities = state.cities.filter((item) => item !== city);
      } else {
        state.cities.push(city);
      }
    },
  },
});

export const { toggleFavoriteCrypto, toggleFavoriteCity } = favoritesSlice.actions;
export default favoritesSlice.reducer;
