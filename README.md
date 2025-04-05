# CryptoWeather Nexus

A multi page dashboard combining weather data, cryptocurrency information, and real time notifications.

## 📂 Repository

(https://github.com/ani71ket/UserologyAssignment)

## 🚀 Live Demo

userology-assignment-two.vercel.app

## 🛠 Tech Stack

- **Next.js v13+** (App Router, SSR/SSG)
- **React** (hooks)
- **Redux** (+ Thunk)
- **Tailwind CSS**
- **CoinCap WebSocket** (live price updates)
- **OpenWeatherMap** (weather)
- **CoinGecko** (crypto metrics)
- **NewsData.io** (headlines)

## ⚙️ Setup

1. Clone and install dependencies  
   ```bash
   git clone https://github.com/ani71ket/UserologyAssignment.git
   cd cryptoweather-nexus
   npm install
   ```
2. Create a `.env.local`:
   ```env
   NEXT_PUBLIC_WEATHER_KEY=your_openweathermap_key
   NEXT_PUBLIC_CRYPTO_API=your_coingecko_key
   NEXT_PUBLIC_NEWS_API=your_newsdata_key
   ```
3. Run in development  
   ```bash
   npm run dev
   ```

## 📁 Features

- **Dashboard**  
  - Weather for New York, London, Tokyo  
  - Live crypto prices (BTC, ETH, …)  
  - Top 5 crypto news headlines
- **Detail pages**  
  - City history charts  
  - Crypto historical data
- **Real time notifications**  
  - WebSocket alerts for price shifts  
  - Simulated weather alerts
- **Favorites**  
  - Mark cities/cryptos  
  - Persisted in Redux + localStorage
- **Responsive design** with Tailwind

## 🔧 Design Decisions

- **Next.js App Router** for SSR/SSG on deep links  
- **Redux Thunk** to simplify async flows  
- **Tailwind CSS** utility classes for consistency  
- **WebSocket mock** for weather alerts

## ⚠️ Error Handling & Refresh

- Automatic data sync every 60 s  
- Fallback UI on partial API failures

