import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
} from "react-bootstrap";
import { saveAs } from "file-saver";
import Footer from "./layouts/footer";
import Nav from "./layouts/nav";
import Sidebar from "./layouts/sidebar";
import withAuth from "../withAuth";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import "./dashboard.css";

const notyf = new Notyf({
  duration: 3000,
  position: {
    x: "right",
    y: "top",
  },
});

function ManageEmp() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [formData, setFormData] = useState({
    EmployeeName: "",
    Education: "Bachelors",
    JoiningYear: "",
    City: "",
    PaymentTier: "",
    Age: "",
    Gender: "Male",
    EverBenched: "No",
    ExperienceInCurrentDomain: "",
  });

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:3001/getEmployees");
      const data = await response.json();
      if (data.success) {
        setEmployees(data.employees);
      } else {
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (
      !formData.EmployeeName ||
      !formData.Education ||
      !formData.JoiningYear ||
      !formData.City ||
      !formData.PaymentTier ||
      !formData.Age ||
      !formData.Gender ||
      !formData.EverBenched ||
      !formData.ExperienceInCurrentDomain
    ) {
      notyf.error("All fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/addEmployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        notyf.success("Employee Added Successfully");
        setFormData({
          EmployeeName: "",
          Education: "Bachelors",
          JoiningYear: "",
          City: "",
          PaymentTier: "",
          Age: "",
          Gender: "Male",
          EverBenched: "No",
          ExperienceInCurrentDomain: "",
        });
        fetchEmployees();
      } else {
        notyf.error("Error Adding Employee");
      }
    } catch (error) {
      console.error("Error:", error);
      notyf.error("An error occurred");
    }
  };

  const handleRowClick = (employee) => {
    setSelectedEmployee(employee);
    setFormData(employee);
  };

  const handleUpdate = async () => {
    if (!selectedEmployee) {
      notyf.error("Please select an employee to update");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/updateEmployee", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        notyf.success("Employee Updated Successfully");
        window.location.reload(); // Reload the page to fetch updated data
      } else {
        notyf.error("Error Updating Employee");
      }
    } catch (error) {
      console.error("Error:", error);
      notyf.error("An error occurred");
    }
  };

  const handleDelete = async () => {
    if (!selectedEmployee) {
      notyf.error("Please select an employee to delete");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/deleteEmployee", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedEmployee),
      });

      const data = await response.json();

      if (data.success) {
        notyf.success("Employee Deleted Successfully");
        setFormData({
          EmployeeName: "",
          Education: "Bachelors",
          JoiningYear: "",
          City: "",
          PaymentTier: "",
          Age: "",
          Gender: "Male",
          EverBenched: "No",
          ExperienceInCurrentDomain: "",
        });
        setSelectedEmployee(null);
        fetchEmployees(); // Fetch updated employee list
      } else {
        notyf.error("Error Deleting Employee");
      }
    } catch (error) {
      console.error("Error:", error);
      notyf.error("An error occurred");
    }
  };

  const handleReset = () => {
    // Reset form data
    setFormData({
      EmployeeName: "",
      Education: "Bachelors",
      JoiningYear: "",
      City: "",
      PaymentTier: "",
      Age: "",
      Gender: "Male",
      EverBenched: "No",
      ExperienceInCurrentDomain: "",
    });
  };

  const handleDownload = () => {
    const csvData = convertToCSV(employees);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "employees.csv");
  };

  const convertToCSV = (data) => {
    const headers = [
      "Employee Name",
      "Education",
      "Joining Year",
      "City",
      "Payment Tier",
      "Age",
      "Gender",
      "Ever Benched",
      "Experience",
    ].join(",");

    const csvRows = data.map((employee) => {
      return [
        employee.EmployeeName,
        employee.Education,
        employee.JoiningYear,
        employee.City,
        employee.PaymentTier,
        employee.Age,
        employee.Gender,
        employee.EverBenched,
        employee.ExperienceInCurrentDomain,
      ].join(",");
    });

    return [headers, ...csvRows].join("\n");
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
                <h1 className="dashboard-title mt-4 mb-5">Manage Employees</h1>
                <Card className="mt-4 mb-4">
                  <Card.Body>
                    <div className="d-flex justify-content-end mt-4 mb-3 DwnBtn-Area">
                      <button className="Download-btn" onClick={handleDownload}>
                        <span className="Download-btn_lg">
                          <span className="Download-btn_sl"></span>
                          <span className="Download-btn_text">
                            Download Now
                          </span>
                        </span>
                      </button>
                    </div>

                    <Table striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Employee Name</th>
                          <th>Education</th>
                          <th>Joining Year</th>
                          <th>City</th>
                          <th>Payment Tier</th>
                          <th>Age</th>
                          <th>Gender</th>
                          <th>Ever Benched</th>
                          <th>Experience</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employees.map((employee, index) => (
                          <tr
                            key={index}
                            onClick={() => handleRowClick(employee)}
                          >
                            <td>{index + 1}</td>
                            <td>{employee.EmployeeName}</td>
                            <td>{employee.Education}</td>
                            <td>{employee.JoiningYear}</td>
                            <td>{employee.City}</td>
                            <td>{employee.PaymentTier}</td>
                            <td>{employee.Age}</td>
                            <td>{employee.Gender}</td>
                            <td>{employee.EverBenched}</td>
                            <td>{employee.ExperienceInCurrentDomain}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
                <Form className="employee-form">
                  <Row>
                    <Col md={6}>
                      <Form.Group
                        controlId="EmployeeName"
                        className="d-flex flex-column mt-4"
                      >
                        <Form.Label className="form-label">
                          Employee Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Employee Name"
                          name="EmployeeName"
                          value={formData.EmployeeName}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group
                        controlId="Education"
                        className="d-flex flex-column mt-4"
                      >
                        <Form.Label className="form-label">
                          Education
                        </Form.Label>
                        <Form.Control
                          as="select"
                          name="Education"
                          value={formData.Education}
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option>Bachelors</option>
                          <option>Masters</option>
                          <option>PHD</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group
                        controlId="JoiningYear"
                        className="d-flex flex-column mt-4"
                      >
                        <Form.Label className="form-label">
                          Joining Year
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Joining Year"
                          name="JoiningYear"
                          value={formData.JoiningYear}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group
                        controlId="City"
                        className="d-flex flex-column mt-4"
                      >
                        <Form.Label className="form-label">City</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter City"
                          name="City"
                          value={formData.City}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group
                        controlId="PaymentTier"
                        className="d-flex flex-column mt-4"
                      >
                        <Form.Label className="form-label">
                          Payment Tier
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Payment Tier"
                          name="PaymentTier"
                          value={formData.PaymentTier}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group
                        controlId="Age"
                        className="d-flex flex-column mt-4"
                      >
                        <Form.Label className="form-label">Age</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Age"
                          name="Age"
                          value={formData.Age}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group
                        controlId="Gender"
                        className="d-flex flex-column mt-4"
                      >
                        <Form.Label className="form-label">Gender</Form.Label>
                        <Form.Control
                          as="select"
                          name="Gender"
                          value={formData.Gender}
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group
                        controlId="EverBenched"
                        className="d-flex flex-column mt-4"
                      >
                        <Form.Label className="form-label">
                          Ever Benched
                        </Form.Label>
                        <Form.Control
                          as="select"
                          name="EverBenched"
                          value={formData.EverBenched}
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option>Yes</option>
                          <option>No</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group
                    controlId="ExperienceInCurrentDomain"
                    className="d-flex flex-column mt-4"
                  >
                    <Form.Label className="form-label">
                      Experience In Current Domain
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Experience"
                      name="ExperienceInCurrentDomain"
                      value={formData.ExperienceInCurrentDomain}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </Form.Group>

                  <div className="form-actions mt-5 mb-5">
                    <Button className="submit-btn" onClick={handleSubmit}>
                      <span>Submit</span>
                    </Button>{" "}
                    <Button className="update-btn" onClick={handleUpdate}>
                      <span>Update</span>
                    </Button>{" "}
                    <Button className="delete-btn" onClick={handleDelete}>
                      <span>Delete</span>
                    </Button>{" "}
                    <Button className="reset-btn" onClick={handleReset}>
                      <span>Reset</span>
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default withAuth(ManageEmp);
