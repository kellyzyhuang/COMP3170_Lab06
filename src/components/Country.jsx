import React from "react";

const Country = ({ country }) => {
  return (
    <div className="country" >
      <img src={country.flags?.svg} alt={`${country.name.common} flag`} width="100" />
      <h3>{country.name.common}</h3>
      <p>Capital: {country.capital?.[0]}</p>
      <p>Population: {country.population}</p>
      <p>Area: {country.area} km²</p>
      <p>Continent: {country.continents?.[0]}</p>
      <p>Sub-region: {country.subregion}</p>
    </div>
  );
};

export default Country;
