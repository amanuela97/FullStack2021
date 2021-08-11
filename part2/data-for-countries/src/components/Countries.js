import {useState, useEffect} from 'react';
import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;

const Country = ({country, amount, handleOnClick}) => {
    const [weather, setWeather] = useState({})

    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${country.capital}`)
        .then(response => {
            setWeather(response.data.current)
        })
        return () => setWeather({})
    },[country.capital])
    return(
        amount > 1 ?
        <>
            <p>{country.name}
                <button onClick={() => handleOnClick(country)}>show</button>
            </p>
        </> : 
        <>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h1>Spoken languages</h1>
            <ul>
              {country.languages.map(language => 
                <li key={language.name}>{language.name}</li>
              )}  
            </ul>
            <img 
                src={country.flag} 
                alt={country.name} 
                width="200px" 
            />
            {weather !== undefined && Object.keys(weather).length > 0 && 
            <>
                <h3>Weather in {country.capital}</h3>
                <p><strong>temprature:</strong> {weather.temperature}</p>
                <img
                    src={weather.weather_icons[0]}
                    alt={weather.weather_descriptions[0]}
                    height="100"
                    width="100"
                />
                <p><strong>Wind:</strong> {weather.wind_speed} mph direction {weather.wind_dir}</p>
            </>
            }
        </>
    )
}

function Countries({data, handleOnClick}) {

    return (
        data.length > 10 ?
        <p>Too many matches, specify another filter</p> :
        <>
          {data.map((country) => 
            <Country 
            key={country.name} 
            country={country} 
            amount={data.length} 
            handleOnClick={handleOnClick} 
            />
          )}  
        </>
    );
}

export default Countries;