import axios from "axios";
import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import Card from "@/components/Card";
import FilterState from "@/components/FilterState";

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryData, setCountryData] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [filteredUniversities, setFilteredUniversities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedCountry) {
        try {
          const response = await axios.post("/api/fetch/fetchData", {
            country: selectedCountry,
          });
          const data = response.data;
          console.log(data);
          setCountryData(data.filteredUniversities);
          setStates(data.uniqueStates);
          setFilteredUniversities(data.filteredUniversities);
          setSelectedState("");
        } catch (error) {
          console.error("Error fetching country data:", error);
        }
      }
    };

    fetchData();
  }, [selectedCountry]);

  useEffect(() => {
    console.log(selectedState);
    if (selectedState !== "") {
      const filtered = countryData.filter(
        (university: any) =>
          university["state_province"] &&
          university["state_province"].toLowerCase() ===
            selectedState.toLowerCase()
      );
      setFilteredUniversities(filtered);
    } else {
      setFilteredUniversities(countryData);
    }
  }, [selectedState, countryData]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <title>GetYourUniversity</title>
      <h1 className="text-3xl font-bold text-start mb-8 text-blue-600">
        GetYourUniversity
      </h1>

      <SearchBar setCountry={setSelectedCountry} />

      {countryData.length > 0 && (
        <div className="mt-8">
          <FilterState states={states} setSelectedState={setSelectedState} />

          {filteredUniversities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {filteredUniversities.map((university, index) => (
                <Card key={index} university={university} />
              ))}
            </div>
          ) : (
            <p className="mt-4 text-center text-gray-600">
              No universities found.
            </p>
          )}
        </div>
      )}
    </main>
  );
}
