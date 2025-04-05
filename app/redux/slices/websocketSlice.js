// redux/slices/websocketSlice.js
import { createSlice } from "@reduxjs/toolkit";

const websocketSlice = createSlice({
  name: "websocket",
  initialState: { 
    prices: {}, 
    increase: {}, 
    notifications: []  // ✅ Added notifications state
  },
  reducers: {
    updatePrice: (state, action) => {
      const { id, price } = action.payload;
      
      // Check if price increased or decreased
      state.increase[id] = !state.prices[id] || state.prices[id] < price;

      // Update price
      state.prices[id] = price;

      // 🔔 Add notification if price changes significantly
      if (Math.abs(state.prices[id] - price) > 50) {
        state.notifications.push({
          type: "price_alert",
          message: `${id.toUpperCase()} price changed significantly to $${price}!`,
        });
      }
    },

    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },

    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const { updatePrice, addNotification, clearNotifications } = websocketSlice.actions;
export default websocketSlice.reducer;
