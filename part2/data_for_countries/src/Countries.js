import React from 'react';
import Country from './Country';

const Countries = ({countries}) => {
    return ( 
        <div>
            {
                countries.length === 1
                ? <Country country={countries[0]} />
                : countries.map(country => {
                    return (<p key={+country.numericCode}>{country.name}</p>)
                })
                
               
            }
        </div>
     );
}
 
export default Countries;