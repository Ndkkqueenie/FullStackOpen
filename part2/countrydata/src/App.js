import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3/all')
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          setCountries(response.data);
        }
      })
      .catch((error) => {
        console.log('Error fetching countries:', error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Country Information</h1>
      <div>
        <input
          type="text"
          placeholder="Search country..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div>
        {filteredCountries.map((country) => (
          <div key={country.cca3}>
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital}</p>
            <p>Region: {country.region}</p>
            <p>Population: {country.population}</p>
            {/* Add more country information as desired */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
