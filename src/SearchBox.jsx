import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

export default function SearchBox({updateInfo}){
     const API_URL = "https://api.openweathermap.org/data/2.5/weather" ;
     const API_KEY = "20045b26230d1291592ab5e34d0626bc" ;
     let [city , setCity] = useState("");
     let [error , setError] = useState(false);
     let getWeatherInfo = async ()=>{
        try{
          
        let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        let jsonResponse = await response.json();
        console.log(jsonResponse);
        let result = {
           city:city,
           temp: jsonResponse.main.temp,
           tempMin: jsonResponse.main.temp_min,
           tempMax: jsonResponse.main.temp_max,
           humidity: jsonResponse.main.humidity,
           feelsLike: jsonResponse.main.feels_like,
           weather: jsonResponse.weather[0].description,

        };
        return result;
        }catch(err){
           throw error;
        }
     }

    let handleChange = (event)=>{
         setCity(event.target.value);
    };

    let handleSubmit = async (event)=>{
       try{
          event.preventDefault();
          setCity("");
         let newInfo =  await getWeatherInfo();
         updateInfo(newInfo);
       }catch(error){
          setError(true);
       }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
            <TextField id="city" label="City Name" variant="outlined" required value={city}onChange={handleChange}/><br></br><br></br>
            <Button variant="contained" type="submit">Search</Button>
           
           {error && <p style={{color:"red"}}>No such place exist in API!</p>}
           
            </form>
        </div>
    );
}