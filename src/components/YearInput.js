
import React, { useState } from 'react';
import './YearInput.css';

const YearInput = ({ handleChange }) => {
  const [error, setError] = useState('');

  const validateYear = (e) => {
    const inputYear = e.target.value;
    
    if (inputYear < 2022) {
      setError("⚠️ Please enter a year above 2021.");
    } else {
      setError('');
      handleChange(e); // Pass the valid year to the parent component
    }
  };

  return (
    <div className="form-group">
      <label>📅 Year:</label>
      <input 
        type="number" 
        name="year" 
        min="2021" 
        placeholder="Enter year (2021+)" 
        onChange={validateYear} 
        required 
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default YearInput;
