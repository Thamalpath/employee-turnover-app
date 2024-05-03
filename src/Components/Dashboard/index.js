import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Footer from "./layouts/footer";
import Nav from "./layouts/nav";
import Sidebar from "./layouts/sidebar";
import withAuth from "../withAuth";
import "./dashboard.css";

function HRDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-container">
      <Nav fluid />
      <Container fluid>
        <Row>
          <Col md={isSidebarOpen ? 3 : 1} className="sidebar-col">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          </Col>
          <Col md={isSidebarOpen ? 9 : 11}>
            <Card className="dashboard-card mt-4">
              <Card.Body>
                <h1 className="dashboard-title">
                  Welcome to the Employee Turnover Prediction Dashboard
                </h1>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default withAuth(HRDashboard);
