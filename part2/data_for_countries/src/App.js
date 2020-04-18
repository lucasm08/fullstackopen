import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Countries from './Countries'
import './App.css';

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [displayCountry, setDisplayCountry] = useState(false)
 // const [result, setResult] = useState([])

 let filterResult = search.length
 ? countries.filter(country => (country.name.toLowerCase().includes(search.toLowerCase()))) :  []

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(res => {
      setCountries(res.data)
    })
  }, [])

  const handleCountriesSearch = (e) => {
    setSearch(e.target.value);
    setDisplayCountry(false)
  } 
  return (
    <div>
      <div style={{marginBottom: "10px"}}>
      find countries: <input onChange={handleCountriesSearch} value={search} />
      </div>
      {
        filterResult.length < 11 ? 
        <Countries countries={filterResult} setDisplayCountry={setDisplayCountry} displayContry={displayCountry}/> : 
        "Too many matches, specify another filter" 
      }
    </div>
  );
}

export default App;
