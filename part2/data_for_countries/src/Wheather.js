import React from 'react';

const Weather = ({weather, name}) => {
    return ( 
        <div>
            <h3>Wheather in {name}</h3>
            <p><span style={{fontWeight: "bold"}}>temperature: </span>{weather.temperature} Celcius</p>
            <img src={weather.weather_icons && weather.weather_icons[0] } alt="Current Weather Icon"/>
            <p><span style={{fontWeight: "bold"}}>wind: </span>{weather.wind_speed} mph direction {weather.wind_dir}</p>
        </div>
     );
}
 
export default Weather;