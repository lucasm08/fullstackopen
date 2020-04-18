import React from 'react';

const CountryPage = ({country}) => {
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


        </div>
     );
}
 
export default CountryPage;