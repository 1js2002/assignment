import React, { useState, useEffect } from "react";
import { Country, City, State } from "country-state-city";
import Select from "react-select";
import Form from "react-bootstrap/Form";

const CountriesWithStates = new Set([
  "AU",
  "AT",
  "BR",
  "DE",
  "FM",
  "IN",
  "MM",
  "MX",
  "MY",
  "NZ",
  "NG",
  "PW",
  "SS",
  "US",
]);

const LocationForm = ({ register, cityerrors, stateerrors, countryerrors }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const isCountryWithState = CountriesWithStates.has(
    selectedCountry?.value || ""
  );

  const handleSelectedCountry = (option) => {
    setSelectedCountry(option);
    setSelectedCity(null);
    setSelectedState(null);
    register("country", { value: option?.label }); // Register the selected country using the react-hook-form register function
  };

  const handleSelectedState = (option) => {
    setSelectedState(option);
    setSelectedCity(null);
    register("state", { value: option?.label }); // Register the selected state using the react-hook-form register function
  };

  const handleSelectedCity = (option) => {
    setSelectedCity(option);
    register("city", { value: option?.label }); // Register the selected city using the react-hook-form register function
  };

  const getStateOptions = () => {
    const options =
      State.getStatesOfCountry(selectedCountry?.value || "") || [];
    return options.map((state) => ({
      value: state.isoCode,
      label: state.name,
    }));
  };

  const getCityOptions = () => {
    let options = [];

    if (isCountryWithState) {
      options =
        City.getCitiesOfState(
          selectedCountry?.value || "",
          selectedState?.value || ""
        ) || [];
    } else {
      options = City.getCitiesOfCountry(selectedCountry?.value || "") || [];
    }

    return options.map((city) => ({
      value: city.name,
      label: city.name,
    }));
  };

  // useEffect to register the initial values on component mount
  useEffect(() => {
    if (selectedCountry) {
      register("country", { value: selectedCountry?.value });
    }
    if (selectedState) {
      register("state", { value: selectedState?.value });
    }
    if (selectedCity) {
      register("city", { value: selectedCity?.value });
    }
  }, [selectedCountry, selectedState, selectedCity, register]);

  return (
    <div className="space-y-4">
      <div className="  space-x-3 flex items-center ">
        <div className="flex flex-col  space-x-2">
          <Form.Label htmlFor="country" className="fw-bold text-left">
            Country:
          </Form.Label>
          <Select
            className="text-black"
            value={selectedCountry}
            onChange={handleSelectedCountry}
            options={Country.getAllCountries().map((country) => ({
              value: country.isoCode,
              label: country.name,
            }))}
            id="countryName"
          />
          <p className="text-xs text-red-400">{countryerrors}</p>
        </div>
        {selectedCountry && isCountryWithState && (
          <div className="flex flex-col items-start space-x-2">
            <Form.Label htmlFor="state" className="fw-bold">
              State:
            </Form.Label>
            <Select
              className="text-black"
              value={selectedState}
              onChange={handleSelectedState}
              options={getStateOptions()}
              id="stateName"
            />
            <p className="text-xs text-red-400">{stateerrors}</p>
          </div>
        )}

        {((selectedCountry && isCountryWithState && selectedState) ||
          (selectedCountry && !isCountryWithState)) && (
          <div className="flex flex-col items-start space-x-2">
            <Form.Label htmlFor="city" className="fw-bold">
              City:
            </Form.Label>
            <Select
              className="text-black"
              value={selectedCity}
              onChange={handleSelectedCity}
              options={getCityOptions()}
              id="cityName"
            />
            <p className="text-xs text-red-400">{cityerrors}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationForm;
