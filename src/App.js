import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginComponent from "./Components/LoginSignup/login";
import SignUpComponent from "./Components/LoginSignup/signup";
import HRDashboard from "./Components/Dashboard/index";
import ManageEmp from "./Components/Dashboard/employees";
import Predict from "./Components/Dashboard/predict";
import PredictHistory from "./Components/Dashboard/predit-history";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/signup" element={<SignUpComponent />} />
            <Route path="/dashboard" element={<HRDashboard />} />
            <Route path="/prediction" element={<Predict />} />
            <Route path="/predict-history" element={<PredictHistory />} />
            <Route path="/manage-employees" element={<ManageEmp />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
