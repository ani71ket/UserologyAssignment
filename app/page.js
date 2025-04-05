import React from 'react'
import News from './components/news'
import Weather from './components/ThreeWeather'
import Crypto from './components/crypto'



export default function page() {
  return (
    <div>
      <Weather/>
      <Crypto/> 
      <News/>
    </div>
  )
}
