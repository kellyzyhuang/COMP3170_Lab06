import React from "react";
import Country from "./Country";

const Countries = ({ data }) => {
  return (
    <div className="countries">
      {data.map((country) => (
        <Country key={country.cca3} country={country} />
      ))}
    </div>
  );
};

export default Countries;
