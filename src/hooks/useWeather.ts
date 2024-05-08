import axios from "axios"  // simplifica los llamados a las APIS externas
//import { z } from 'zod'
import { object, string, number, Output, parse } from 'valibot'
import { SearchType } from "../types"



// TYPE GUARD O ASSERTION
//function isWeatherRespond(weather: unknown) : weather is Weather {
      //return (
       //  Boolean(weather) && 
       //  typeof weather === 'object' && 
       //  typeof (weather as Weather).name === //'string' &&
       //  typeof (weather as Weather).main.temp === 'number' &&
        // typeof (weather as Weather).main.temp_max === 'number' &&
        // typeof (weather as Weather).main.temp_min === 'number'
     // )
//}

// Zod 
//const Weather = z.object({
//   name: z.string(),
//    main: z.object({
//        temp: z.number(),
//        temp_max: z.number(),
//        temp_min: z.number(),
//    })
//})

//type Weather = z.infer<typeof Weather>


// VALIBOT
const WeatherSchema = object({
    name: string(),
    main: object({
        temp: number(),
        temp_max: number(),
        temp_min: number()
    })
})
type Weather = Output<typeof WeatherSchema>

export default function useWeather() {
    
    const fetchWeather = async (search : SearchType) => {
        const appId = import.meta.env.VITE_API_KEY
        try {
           const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`;
           const {data} = await axios(geoUrl)
           
           const lat = data[0].lat
           const lon = data[0].lon

           const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`

            // Castear el type
           //const { data: weatherResult } = //await axios<Weather>(weatherUrl)
           //console.log(weatherResult.temp)
           //console.log(weatherResult.name) 

           // Type Guards
           //const { data: weatherResult } = await axios(weatherUrl)
           //const result = isWeatherRespond(weatherResult)
           // if(result) {
           //     console.log(weatherResult.name)
           // } 

           // Zod
           //const { data: weatherResult } = await axios(weatherUrl)
           //const result = Weather.safeParse(weatherResult)
           //if(result.success){
           // console.log(result.data.name)
           // console.log(result.data.main.temp)
           //}

           // VALIBOT
           const {data : weatherResult} = await axios(weatherUrl)
           const result = parse(WeatherSchema, weatherResult )
           console.log(result.name)

        } catch (error){
            console.log(error)
        }
    }
    return {
          fetchWeather
    }
}