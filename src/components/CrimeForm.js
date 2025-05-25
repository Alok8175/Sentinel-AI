
import React, { useState } from 'react';
import PredictionResult from './PredictionResult';

const cities = [
  { code: "0", name: "Ahmedabad" },
  { code: "1", name: "Bengaluru" },
  { code: "2", name: "Chennai" },
  { code: "3", name: "Coimbatore" },
  { code: "4", name: "Delhi" },
  { code: "5", name: "Ghaziabad" },
  { code: "6", name: "Hyderabad" },
  { code: "7", name: "Indore" },
  { code: "8", name: "Jaipur" },
  { code: "9", name: "Kanpur" },
  { code: "10", name: "Kochi" },
  { code: "11", name: "Kolkata" },
  { code: "12", name: "Kozhikode" },
  { code: "13", name: "Lucknow" },
  { code: "14", name: "Mumbai" },
  { code: "15", name: "Nagpur" },
  { code: "16", name: "Patna" },
  { code: "17", name: "Pune" },
  { code: "18", name: "Surat" },
];

const crimes = [
  { code: "0", name: "Crime Committed by Juveniles" },
  { code: "1", name: "Crime against SC" },
  { code: "2", name: "Crime against ST" },
  { code: "3", name: "Crime against Senior Citizen" },
  { code: "4", name: "Crime against Children" },
  { code: "5", name: "Crime against Women" },
  { code: "6", name: "Cyber Crimes" },
  { code: "7", name: "Economic Offences" },
  { code: "8", name: "Kidnapping" },
  { code: "9", name: "Murder" },
];

export default function CrimeForm() {
  const [formData, setFormData] = useState({ city: '', crime: '', year: '' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch prediction');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to fetch prediction. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>City:</label>
        <select name="city" onChange={handleChange} required>
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city.code} value={city.code}>{city.name}</option>
          ))}
        </select>

        <label>Crime Type:</label>
        <select name="crime" onChange={handleChange} required>
          <option value="">Select Crime Type</option>
          {crimes.map((crime) => (
            <option key={crime.code} value={crime.code}>{crime.name}</option>
          ))}
        </select>

        <label>Year:</label>
        <input
          type="number"
          name="year"
          placeholder="Enter Year"
          min="2000"
          max="2050"
          onChange={handleChange}
          required
        />

        <button type="submit">Predict</button>
      </form>

      {error && <p className="error">{error}</p>}
      {result && <PredictionResult result={result} />}
    </div>
  );
}
