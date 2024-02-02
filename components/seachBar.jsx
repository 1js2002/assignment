"use client";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

const SearchBar = ({ handleSearchChange }) => {
  const [formData, setFormData] = useState({
    product: "",
    size: "",
    phoneNo: "",
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isAnyFieldFilled = () => {
    return Object.values(formData).some((value) => value !== "");
  };

  const handleSearchClick = () => {
    if (isAnyFieldFilled()) {
      handleSearchChange(formData);
      setError(null); // Clear the error when at least one field is filled
    } else {
      setError("Please fill at least one field");
      console.log("Please fill at least one field");
    }
  };

  return (
    <div className="flex space-x-3 items-start w-2/3 ">
      <div className="d-flex space-x-2  ">
        <div className="flex w-2/3 ">
          <Form.Control
            type="search"
            name="product"
            placeholder="Product"
            onChange={handleInputChange}
          />

          <Form.Select
            name="size"
            aria-label="Size"
            onChange={handleInputChange}
          >
            <option value="">Select Size</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </Form.Select>
        </div>
        <div className="flex flex-col w-1/3 ">
          <Form.Control
            type="tel"
            name="phoneNo"
            placeholder="PhoneNo"
            maxLength={10}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="flex  tex-center  ">
        <button className="btn btn-primary" onClick={handleSearchClick}>
          Search
        </button>
        {error === "Please fill at least one field" && (
          <p className="text-red-400 text-xs ">{error}</p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
