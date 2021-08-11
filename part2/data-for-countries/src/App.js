import {useState, useEffect} from 'react';
import axios from 'axios'
import Search from './components/Search';
import Countries from './components/Countries';

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [show, setShow] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState([])

  const SearchedCountries = countries.filter(
    (country) => country.name.toLowerCase().includes(search.toLowerCase()
  ));

  const handleOnSearch = (e) => {
    setShow(false)
    setSearch(e.target.value)
  }
  
  const handleOnClick = (country) => {
    setSelectedCountry([country])
    setShow(true)
  }

  const dataToList = show ? selectedCountry : (search.length > 0 ? SearchedCountries : []);

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
      
  },[])

  return (
    <div className="App">
      <Search 
      value={search} 
      handleOnSearch={handleOnSearch}
      />
      <Countries 
      data={dataToList} 
      handleOnClick={handleOnClick}
      />
    </div>
  );
}

export default App;
