import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faBullseye,
  faUsers,
  faBars,
  faTimes,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const handlePrediction = async () => {
    try {
      // Redirect to the prediction interface
      window.location.href = "/prediction";
    } catch (error) {
      console.error("Error navigating to prediction interface:", error);
    }
  };

  return (
    <div
      className={`border-right ${isOpen ? "active" : ""}`}
      id="sidebar-wrapper"
      style={{ height: "100vh" }}
    >
      {/* Toggle and close button */}
      <button className="toggle-sidebar" onClick={toggleSidebar}>
        {isOpen ? (
          <FontAwesomeIcon icon={faBars} />
        ) : (
          <FontAwesomeIcon icon={faTimes} />
        )}
      </button>
      <div className="list-group list-group-flush">
        <Link
          to="/dashboard"
          className="list-group-item list-group-item-action fw-bold mt-5 d-flex justify-content-between align-items-center"
          style={{
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          <FontAwesomeIcon icon={faChartBar} />
          {isOpen && <span>Dashboard</span>}
        </Link>
        <div
          className="list-group-item list-group-item-action fw-bold d-flex justify-content-between align-items-center"
          style={{
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={handlePrediction}
        >
          <FontAwesomeIcon icon={faBullseye} />
          {isOpen && <span>Prediction</span>}
        </div>
        <Link
          to="/predict-history"
          className="list-group-item list-group-item-action fw-bold d-flex justify-content-between align-items-center"
          style={{
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          <FontAwesomeIcon icon={faHistory} />
          {isOpen && <span>Prediction History</span>}
        </Link>
        <Link
          to="/manage-employees"
          className="list-group-item list-group-item-action fw-bold d-flex justify-content-between align-items-center"
          style={{
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          <FontAwesomeIcon icon={faUsers} />
          {isOpen && <span>Manage Staff</span>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
