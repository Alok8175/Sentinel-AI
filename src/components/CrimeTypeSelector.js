import React from 'react';

const CrimeTypeSelector = ({ crimes, handleChange }) => {
  return (
    <div className="form-group">
      <label>Crime Type:</label>
      <select name="crime" onChange={handleChange} required>
        <option value="">Select Crime Type</option>
        {crimes.map((crime, index) => (
          <option key={index} value={index}>{crime}</option>
        ))}
      </select>
    </div>
  );
};

export default CrimeTypeSelector;
