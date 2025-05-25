
// export default PredictionResult;
import React from 'react';
import './PredictionResult.css'; // Ensure styling is handled separately

const crimeTypes = {
  '0': 'Crime Committed by Juveniles',
  '1': 'Crime against SC',
  '2': 'Crime against ST',
  '3': 'Crime against Senior Citizen',
  '4': 'Crime against Children',
  '5': 'Crime against Women',
  '6': 'Cyber Crimes',
  '7': 'Economic Offences',
  '8': 'Kidnapping',
  '9': 'Murder'
};

const PredictionResult = ({ result }) => {
  if (!result) return null;

  // Determine box color based on crime rate
  const boxColor = result.crime_status === "High Crime Area" ? "red" : "yellow";

  return (
    <div className="result-container" style={{ borderColor: boxColor }}>
      <h2>📊 Prediction Result</h2>
      <p><strong>City:</strong> {result.city_name}</p>
      <p><strong>Year:</strong> {result.year}</p>
      <p><strong>Crime Type:</strong> {crimeTypes[result.crime_code] || "Unknown Crime Type"}</p>
      {/* <p><strong>Crime Status:</strong> {result.crime_status}</p> */}
      {/* <p><strong>Predicted Crime Rate ( Per Lakh ):</strong> {parseFloat(result.crime_rate).toFixed(4)}</p> */}
      <p><strong>Estimated Cases:</strong> {result.cases}</p>
      <p><strong>Population ( In Lakhs ):</strong> {result.population}</p>
      <p><strong>Predicted Crime Rate ( Per Lakh ):</strong> {parseFloat(result.crime_rate).toFixed(4)}</p>
      <p><strong>Crime Status:</strong> {result.crime_status}</p>

      {/* Visual Indicator */}
      <div className="crime-indicator" style={{ backgroundColor: boxColor }}>
        {result.crime_status === "High Crime Area" ? "⚠️ High Crime" : "🟡 Low Crime"}
      </div>
    </div>
  );
};

export default PredictionResult;
