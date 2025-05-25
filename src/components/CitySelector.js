import React from 'react';

const CitySelector = ({ cities, handleChange }) => {
  return (
    <div className="form-group">
      <label>City:</label>
      <select name="city" onChange={handleChange} required>
        <option value="">Select City</option>
        {cities.map((city, index) => (
          <option key={index} value={index}>{city}</option>
        ))}
      </select>
    </div>
  );
};

export default CitySelector;
