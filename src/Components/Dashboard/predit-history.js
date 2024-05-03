import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import Footer from "./layouts/footer";
import Nav from "./layouts/nav";
import Sidebar from "./layouts/sidebar";
import withAuth from "../withAuth";
import "./dashboard.css";

function PredictHistory() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [predictionHistory, setPredictionHistory] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    fetchPredictionHistory();
  }, []);

  const fetchPredictionHistory = async () => {
    try {
      const response = await fetch("http://localhost:3001/predictions");
      const data = await response.json();
      setPredictionHistory(data);
    } catch (error) {
      console.error("Error fetching prediction history:", error);
    }
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
            <Card className="dashboard-card mt-5">
              <Card.Body>
                <h1 className="dashboard-title mt-4 mb-5">
                  Prediction History
                </h1>
                <Card className="mt-4 mb-4">
                  <Card.Body>
                    <Table striped bordered hover responsive>
                      <thead className="header">
                        <tr>
                          <th>#</th>
                          <th>Education</th>
                          <th>Joining Year</th>
                          <th>City</th>
                          <th>Payment Tier</th>
                          <th>Age</th>
                          <th>Gender</th>
                          <th>Ever Benched</th>
                          <th>Experience</th>
                          <th>Prediction</th>
                        </tr>
                      </thead>
                      <tbody>
                        {predictionHistory.map((prediction, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{prediction.education}</td>
                            <td>{prediction.joiningYear}</td>
                            <td>{prediction.city}</td>
                            <td>{prediction.salaryTier}</td>
                            <td>{prediction.age}</td>
                            <td>{prediction.gender}</td>
                            <td>{prediction.everBench}</td>
                            <td>{prediction.experienceInCurrentDomain}</td>
                            <td>{prediction.prediction}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default withAuth(PredictHistory);
