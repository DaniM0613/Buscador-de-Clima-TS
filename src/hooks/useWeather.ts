import axios from "axios"  // simplifica los llamados a las APIS externas
import { SearchType } from "../types"

export default function useWeather() {
    
    const fetchWeather = async (search : SearchType) => {
        const appId = '45e5c825625486f5a3a46a6731ce9316'
        try {
           const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`;
            
           const {data} = await axios(geoUrl)

           console.log(data)

        } catch (error){
            console.log(error)
        }
    }
    return {
          fetchWeather
    }
}