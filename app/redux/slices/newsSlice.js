import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Replace with your actual NewsData.io API key
const API_KEY = process.env.NEXT_PUBLIC_NEWSAPIKEY
const API_URL = `https://newsdata.io/api/1/latest?apikey=${API_KEY}&q=cryptocurrency&language=en`;

// Async action to fetch news articles
export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  try {
    const response = await axios.get(API_URL);
    
    return response.data.results; // Extract the news articles
  } catch (error) {
    throw error;
  }
});

// Redux slice
const newsSlice = createSlice({
  name: "news",
  initialState: {
    articles: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default newsSlice.reducer;
