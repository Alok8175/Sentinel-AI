import React, { useState } from 'react';
import './App.css';
import CitySelector from './components/CitySelector';
import CrimeTypeSelector from './components/CrimeTypeSelector';
import YearInput from './components/YearInput';
import PredictionResult from './components/PredictionResult';

const cities = {
  '0': 'Ahmedabad', '1': 'Bengaluru', '2': 'Chennai', '3': 'Coimbatore', '4': 'Delhi',
  '5': 'Ghaziabad', '6': 'Hyderabad', '7': 'Indore', '8': 'Jaipur', '9': 'Kanpur',
  '10': 'Kochi', '11': 'Kolkata', '12': 'Kozhikode', '13': 'Lucknow', '14': 'Mumbai',
  '15': 'Nagpur', '16': 'Patna', '17': 'Pune', '18': 'Surat'
};

const crimes = {
  '0': 'Crime Committed by Juveniles', '1': 'Crime against SC', '2': 'Crime against ST',
  '3': 'Crime against Senior Citizen', '4': 'Crime against Children', '5': 'Crime against Women',
  '6': 'Cyber Crimes', '7': 'Economic Offences', '8': 'Kidnapping', '9': 'Murder'
};

function App() {
  const initialFormState = { city: '', crime: '', year: '' };
  const [formData, setFormData] = useState(initialFormState);
  const [result, setResult] = useState(null);
  const [formKey, setFormKey] = useState(0); // To force re-render after refresh
  const [isDarkMode, setIsDarkMode] = useState(true); // Theme toggle state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      city: formData.city,
      crime: formData.crime,
      year: formData.year
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      // Map city and crime codes to names before setting the result
      data.city_name = cities[payload.city] || "Unknown City";
      data.crime_type = crimes[payload.crime] || "Unknown Crime Type";

      setResult(data);
    } catch (err) {
      console.error('Prediction failed:', err);
    }
  };

  const handleRefresh = () => {
    setFormData(initialFormState);
    setResult(null);
    setFormKey(prevKey => prevKey + 1);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <header className="app-header">
        <h1 className="sentinel-title">🛡️ Sentinel AI</h1>
      </header>

      <div className={`app-container ${isDarkMode ? 'dark' : 'light'}`}>

        <header className="app-header">
          <h1>🔍 Crime Rate Predictor</h1>
          <p>Predict crime rates across cities with AI-powered insights.</p>
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
        </header>

        <form key={formKey} className="crime-form" onSubmit={handleSubmit}>
          <CitySelector cities={Object.values(cities)} handleChange={handleChange} />
          <CrimeTypeSelector crimes={Object.values(crimes)} handleChange={handleChange} />
          <YearInput handleChange={handleChange} />

          <button type="submit">Predict</button>
          <button type="button" className="refresh-button" onClick={handleRefresh}>🔄 Refresh</button>
        </form>

        {result && <PredictionResult result={result} />}
      </div>

    
    </>
  );

}

export default App;
