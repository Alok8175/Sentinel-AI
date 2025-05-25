from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import math

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained ML model
with open('Model/model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

# population data
POPULATION_DATA = {
    '0': 63.5, '1': 85.0, '2': 87.0, '3': 21.5, '4': 163.1,
    '5': 23.6, '6': 77.5, '7': 21.7, '8': 30.7, '9': 29.2
}

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        city_code = data.get('city')
        crime_code = data.get('crime')
        year = int(data.get('year'))

        # Get population with a default fallback
        pop = POPULATION_DATA.get(city_code, 50)  
        
        # Adjust population growth based on year difference
        year_diff = year - 2011
        pop += 0.01 * year_diff * pop  

        # Predict crime rate
        crime_rate = model.predict([[year, int(city_code), pop, int(crime_code)]])[0]
        crime_status = "High Crime Area" if crime_rate > 5 else "Low Crime Area"
        cases = math.ceil(crime_rate * pop)

        return jsonify({
            'city_code': city_code,
            'crime_code': crime_code,
            'year': year,
            'crime_status': crime_status,
            'crime_rate': crime_rate,
            'cases': cases,
            'population': pop
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
