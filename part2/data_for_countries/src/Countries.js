import React, { useState } from 'react';
import CountryPage from './CountryPage';
//import Country from './Country'

const Countries = ({countries, displayContry, setDisplayCountry}) => {
    const [selected, setSelected] = useState({})

    const handleDisplay = (country) => {
        setDisplayCountry(true)
        setSelected(country)

        
    }

    
    return ( 
        <div>
            {
                displayContry && selected
                ? <CountryPage country={selected} />
                : ""
            }
            {
                displayContry
                ? ""
                : countries.length === 1
                ? <CountryPage country={countries[0]} />
                : countries.map(country => {
                    return (
                        <div key={+country.numericCode}>
                            {country.name} <button onClick={() => {handleDisplay(country)} }>show</button>
                        </div>)
                })
                
               
            }
        </div>
     );
}
 
export default Countries;