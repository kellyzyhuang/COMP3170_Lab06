import React, { useState, useEffect } from "react";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filter, setFilter] = useState({
    continent: "",
    subregion: "",
    topPopulation: false,
    topArea: false,
  });
  const [sortBy, setSortBy] = useState("");

  const [continents, setContinents] = useState([]);
  const [subregions, setSubregions] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);

        const uniqueContinents = [...new Set(data.flatMap((c) => c.continents))];
        setContinents(uniqueContinents);

        const uniqueSubregions = [
          ...new Set(data.map((c) => c.subregion).filter(Boolean)),
        ];
        setSubregions(uniqueSubregions);
      });
  }, []);

  const handleFilterChange = (type, value) => {
    setFilter((prev) => ({
      ...prev,
      [type]: value,
      ...(type === "continent" ? { subregion: "" } : {}),
      ...(type === "subregion" ? { continent: "" } : {}),
    }));
  };

  const handleCheckboxChange = (type) => {
    setFilter((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  useEffect(() => {
    let filtered = [...countries];

    if (filter.continent) {
      filtered = filtered.filter((c) => c.continents?.includes(filter.continent));
    }

    if (filter.subregion) {
      filtered = filtered.filter((c) => c.subregion === filter.subregion);
    }

    if (filter.topPopulation) {
      filtered = filtered
        .sort((a, b) => b.population - a.population)
        .slice(0, 10);
    }

    if (filter.topArea) {
      filtered = filtered.sort((a, b) => b.area - a.area).slice(0, 10);
    }

    setFilteredCountries(filtered);
  }, [filter, countries]);

  return (
    <div className="container">
      <h1>Countries of the World</h1>

      <div className="filters">
        <div>
          <label>
            <input
              type="checkbox"
              checked={filter.topPopulation}
              onChange={() => handleCheckboxChange("topPopulation")}
            />
            Top 10 by Population
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={filter.topArea}
              onChange={() => handleCheckboxChange("topArea")}
            />
            Top 10 by Area
          </label>
        </div>

        <div>
          <label>Sort by Continent:</label>
          <select
            onChange={(e) => handleFilterChange("continent", e.target.value)}
            value={filter.continent}
          >
            <option value="">All Continents</option>
            {continents.map((continent) => (
              <option key={continent} value={continent}>
                {continent}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Sort by Subregion:</label>
          <select
            onChange={(e) => handleFilterChange("subregion", e.target.value)}
            value={filter.subregion}
          >
            <option value="">All Subregions</option>
            {subregions.map((subregion) => (
              <option key={subregion} value={subregion}>
                {subregion}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Countries data={filteredCountries} />
    </div>
  );
};

export default App;
