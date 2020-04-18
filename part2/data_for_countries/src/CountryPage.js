import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Weather from './Wheather'


const CountryPage = ({country}) => {
    const [weather, setWeather] = useState({})

    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=
        ${country.name}`)
        .then((res) => {
            setWeather(res.data.current)
        })

    }, [country.name])
    return ( 
        <div>
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h3>languages</h3>
            <ul>
                {
                    country.languages.map(language => {
                        return (     
                            <li key={language.name}>{language.name}</li>  
                        )
                    })
                }
            </ul>
            
            <img src={country.flag} widt="100" height="67" alt="country flag"/>
            <Weather name={country.name} weather={weather} />


        </div>
     );
}
 
export default CountryPage;