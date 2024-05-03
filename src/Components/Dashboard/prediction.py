import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import mysql.connector

scaler = pickle.load(open('scaler.pkl', 'rb'))
knn_model = pickle.load(open('knn_model.pkl', 'rb'))

app = Flask(__name__)
CORS(app) 

# MySQL connection
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="turnover_db"
)
cursor = conn.cursor()

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    print(f"Received data: {data}") 

    input_values = data.get('features')

    if not input_values:
        return jsonify({"error": "Please provide features"}), 400

    education = {'bachelors': 0, 'masters': 1, 'phd': 2}
    city = {'mount lavinia': 0, 'maharagama': 1, 'homagama': 2}
    gender = {'male': 0, 'female': 1}
    ever_bench = {'no': 0, 'yes': 1}

    try:
        user_features = [
            education.get(input_values['education'].lower(), -1),
            int(input_values['joiningYear']),
            city.get(input_values['city'].lower(), -1),
            int(input_values['salaryTier']),
            int(input_values['age']),
            gender.get(input_values['gender'].lower(), -1),
            ever_bench.get(input_values['everBench'].lower(), -1),
            int(input_values['experienceInCurrentDomain']) 
        ]
        print(f"Processed user features: {user_features}") 
        if -1 in user_features:
            return jsonify({"error": "Please fill all boxes with correct values"}), 400
    except (KeyError, ValueError) as e:
        print(f"Error: {e}") 
        return jsonify({"error": "Please fill all boxes with correct values"}), 400

    new_data = scaler.transform(np.array(user_features).reshape(1, -1))
    output = knn_model.predict(new_data)

    prediction = "This Employee is likely to leave the company" if output[0] == 1 else "This Employee will not leave the company"
    
    # Insert prediction data into MySQL table
    query = "INSERT INTO predictions (education, joiningYear, city, salaryTier, age, gender, everBench, experienceInCurrentDomain, prediction) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
    cursor.execute(query, (
        input_values['education'],
        input_values['joiningYear'],
        input_values['city'],
        input_values['salaryTier'],
        input_values['age'],
        input_values['gender'],
        input_values['everBench'],
        input_values['experienceInCurrentDomain'],
        prediction
    ))
    conn.commit()

    return jsonify({"prediction": prediction})

if __name__ == '__main__':
    app.run(debug=True)