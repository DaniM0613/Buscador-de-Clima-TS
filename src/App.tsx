import styles from'./App.module.css'
import Form from './components/Form/Form'
import useWeather from './hooks/useWeather'
import WeatherDeatail from './components/WeatherDetails/WeatherDeatail'
import Sipnner from './components/Spiner/Spiner'
import Alert from './components/Alert/Alert'

function App() {
  
  const  {fetchWeather, weather, hasWeatherData, loading, notFound}  = useWeather()

  return (
    <> 
      <h1 className={styles.title}>Buscador de clima</h1>
       <div className={styles.container}>
          <Form
            fetchWeather={fetchWeather}
          />
          {loading && <Sipnner/>}
          {hasWeatherData && <WeatherDeatail weather={weather}/>}
          {notFound && <Alert>Ciudad No Encontrada</Alert>}
       </div>
       </>
  )
}

export default App
