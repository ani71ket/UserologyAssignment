import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Async action to fetch cryptocurrency data
export const fetchCryptoData = createAsyncThunk("crypto/fetchCryptoData", async (id) => {
  const API_URL =
  `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`;

  try {
    const response = await axios.get(API_URL);
    console.log("asking for crypto data")
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Redux slice
const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        console.log(action.payload)
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default cryptoSlice.reducer;
