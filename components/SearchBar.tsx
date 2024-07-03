import axios from "axios";
import React, { useState, useEffect } from "react";

const SearchBar = (props: any) => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.post("/api/fetch/fetchCountries");
        const data = response.data;
        setCountries(data.countries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredCountries([]);
    } else {
      const results = countries.filter((country: any) =>
        country.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCountries(results);
    }
  }, [searchTerm, countries]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCountryClick = (country: any) => {
    props.setCountry(country);
    setSearchTerm("");
    setFilteredCountries([]);
  };

  return (
    <div className="mt-4">
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        id="input-tag"
        onChange={handleSearch}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
      />
      <ul className="mt-2">
        {filteredCountries.map((country: any, index: number) => (
          <li
            key={index}
            onClick={() => handleCountryClick(country)}
            className="py-2 px-4 cursor-pointer hover:bg-gray-100"
          >
            {country}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
