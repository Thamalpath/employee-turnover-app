import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import Footer from "./layouts/footer";
import Nav from "./layouts/nav";
import Sidebar from "./layouts/sidebar";
import withAuth from "../withAuth";
import "./dashboard.css";

const Predict = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [features, setFeatures] = useState({
    education: "",
    joiningYear: "",
    city: "",
    salaryTier: "",
    age: "",
    gender: "",
    everBench: "",
    experienceInCurrentDomain: "",
  });
  const [prediction, setPrediction] = useState("");
  const [error, setError] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeatures({ ...features, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/predict", {
        features,
      });
      setPrediction(response.data.prediction);
      setError("");
    } catch (error) {
      setPrediction("");
      setError(error.response.data.error || "Something went wrong!");
    }
  };

  const handleReset = (e) => {
    e.preventDefault();

    setFeatures({
      education: "",
      joiningYear: "",
      city: "",
      salaryTier: "",
      age: "",
      gender: "",
      everBench: "",
      experienceInCurrentDomain: "",
    });
    setPrediction("");
    setError("");
  };

  return (
    <div className="dashboard-container">
      <Nav />
      <Container fluid>
        <Row>
          <Col md={isSidebarOpen ? 3 : 1} className="sidebar-col">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          </Col>
          <Col md={isSidebarOpen ? 9 : 11}>
            <Card className="dashboard-card mt-5 mb-5">
              <Card.Body style={{ backgroundColor: "#F3F8FF" }}>
                <form onSubmit={handleSubmit}>
                  <h1 className="dashboard-title mb-5 mt-4">
                    Employee Turnover Prediction
                  </h1>

                  <div className="prediction-form mt-3 d-flex flex-column align-items-center">
                    {Object.keys(features).map((key) => (
                      <input
                        key={key}
                        type="text"
                        className="form-control mb-4 w-75"
                        placeholder={`Input ${key}`}
                        name={key}
                        value={features[key]}
                        onChange={handleChange}
                      />
                    ))}
                    <div className="btn-area mt-3 mb-3 d-flex justify-content-between w-75">
                      <button className="button2 me-5" type="submit">
                        Predict
                      </button>
                      <button className="button3 ms-5" onClick={handleReset}>
                        Reset
                      </button>
                    </div>
                  </div>
                </form>

                <div className="mt-4 mb-4 d-flex justify-content-center">
                  {prediction && (
                    <div className="prediction-result">
                      <p>Prediction: {prediction}</p>
                    </div>
                  )}
                  {error && (
                    <div className="error-message">
                      <p>Error: {error}</p>
                    </div>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default withAuth(Predict);
