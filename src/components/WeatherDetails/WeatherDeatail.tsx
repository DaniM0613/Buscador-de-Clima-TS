import type { Weather } from "../../types"
import { formatTemperature } from "../../utils"
import styles from './WeatherDetail.module.css'

type WeatherDeatilsProps = {
    weather : Weather
}

export default function WeatherDeatail({weather} : WeatherDeatilsProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Clima de: {weather.name}</h2>
      <p className={styles.current} >{ formatTemperature (weather.main.temp)}&deg;C</p>
      <div className={styles.temperatures} >
        <p>Max: <span>{ formatTemperature (weather.main.temp_max)}&deg;C</span></p>
        <p>Min: <span>{ formatTemperature (weather.main.temp_min)}&deg;C</span></p>
      </div>
    </div>
  )
}
