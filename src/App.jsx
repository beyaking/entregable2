import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'

function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] =useState()

  const success = pos => {
console.log(pos.coords)
setCoords({
  lat: pos.coords.latitude,
  lon: pos.coords.longitude
})
  }

  console.log(coords)

  
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  
  },[])

  useEffect(() => { 
if(coords){
  const apiKey = 'c49635b38ce620c97784bdcf2ba6088a'
  const URL =  `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`
  axios.get(URL)
  .then(res => {
    setWeather(res.data)

    const celsius = (res.data.main.temp -273.15).toFixed(0)
    const farenheit = (celsius * 9 / 5 + 32).toFixed(0)
    setTemp({celsius,farenheit})
  })
  .catch(err => console.log(err))
}
  },[coords])
  
  

  return (
    <div className="App">

<div id="foglayer_01" class="fog">
  <div className="image01"></div>
  <div className="image02"></div>
</div>
<div id="foglayer_02" class="fog">
  <div className="image01"></div>
  <div className="image02"></div>
</div>
<div id="foglayer_03" class="fog">
  <div className="image01"></div>
  <div className="image02"></div>
</div>


      <WeatherCard weather={weather}
      temp={temp}
      />
    </div>
  )
}

export default App
