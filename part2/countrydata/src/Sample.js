import React, { useState, useEffect } from 'react';
import countryService from './services/countries';
import weatherService from './services/weather';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(10);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        if (initialCountries && Array.isArray(initialCountries)) {
          setCountries(initialCountries);
        }
      })
      .catch((error) => {
        console.log('Error fetching countries:', error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setSelectedCountry(null); // Reset selected country when search term changes
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
    fetchWeather(country.capital);
  };

  const fetchWeather = (city) => {
    weatherService
      .getWeather(city)
      .then(weatherData => {
        setWeather(weatherData);
      })
      .catch((error) => {
        console.log('Error fetching weather:', error);
      });
  };

  const renderWeather = () => {
    if (weather) {
      const { name, main, weather: weatherInfo } = weather;
      return (
        <div>
          <h3>Weather in {name}</h3>
          <p>Temperature: {main.temp}°C</p>
          <p>Weather: {weatherInfo[0].description}</p>
        </div>
      );
    }
    return null;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedCountry(null); // Reset selected country when page changes
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const paginatedCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);
  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);

  const renderCountries = paginatedCountries.map((country) => (
    <div key={country.cca3}>
      <h2>{country.name.common}</h2>
      <button onClick={() => handleCountryClick(country)}>Show Details</button>
    </div>
  ));

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
        {renderCountries}
      </div>
      <div>
        {selectedCountry && (
          <div>
            <h2>{selectedCountry.name.common}</h2>
            <p>Capital: {selectedCountry.capital}</p>
            <p>Region: {selectedCountry.region}</p>
            <p>Population: {selectedCountry.population}</p>
            <img src={selectedCountry.flags.png} alt={`Flag of ${selectedCountry.name.common}`} />
            {renderWeather()}
          </div>
        )}
      </div>
      <div>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous Page
        </button>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default App;
