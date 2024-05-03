import json
from prediction import app
import pytest


@pytest.fixture
def client():
    with app.test_client() as client:
        yield client


def test_predict_valid_input(client):
    input_data = {
        "features": {
            "education": "Bachelors",
            "joiningYear": "2016",
            "city": "Mount Lavinia",
            "salaryTier": "3",
            "age": "39",
            "gender": "Male",
            "everBench": "No",
            "experienceInCurrentDomain": "2"
        }
    }
    response = client.post('/predict', json=input_data)
    data = response.get_json()

    assert response.status_code == 200
    assert "prediction" in data
    assert data["prediction"] in ["This Employee is likely to leave the company", "This Employee will not leave the company"]


def test_predict_missing_features(client):
    input_data = {}
    response = client.post('/predict', json=input_data)
    data = response.get_json()

    assert response.status_code == 400
    assert "error" in data
    assert data["error"] == "Please provide features"


def test_predict_invalid_input(client):
    input_data = {
        "features": {
            "education": "Bachelors",
            "joiningYear": "2022",
            "city": "InvalidCity",
            "salaryTier": "5",
            "age": "30",
            "gender": "Male",
            "everBench": "No",
            "experienceInCurrentDomain": "5"
        }
    }
    response = client.post('/predict', json=input_data)
    data = response.get_json()

    assert response.status_code == 400
    assert "error" in data
    assert data["error"] == "Please fill all boxes with correct values"
