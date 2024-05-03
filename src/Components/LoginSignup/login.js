import React, { useState } from "react";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import "./LoginSignup.css";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const notyf = new Notyf({
  duration: 3000,
  position: {
    x: "right",
    y: "top",
  },
});

function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      notyf.error("All fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const { user } = data;
        localStorage.setItem("user", JSON.stringify(user));
        notyf.success("Login Successful");
        setTimeout(() => {
          window.location.href = "../Dashboard";
        }, 3000);
      } else {
        notyf.error(data.message || "Login failed");
      }
    } catch (error) {
      notyf.error("Login failed");
      console.error("Error:", error);
    }
  };

  return (
    <div className="body">
      <style>
        {`
          body {
            margin: 0;
            padding: 0;
            background-image: url(https://cdn.pixabay.com/photo/2023/05/14/10/27/ai-generated-7992462_1280.jpg);
            background-repeat: no-repeat;
            background-size: cover;
          }
        `}
      </style>
      <div className="login-container">
        <MDBContainer className="glass-effect p-5 my-5 d-flex flex-column">
          <h1 className="fw-bold mb-5 custom-font">Sign In</h1>

          <MDBInput
            wrapperClass="mb-4 custom-font"
            placeholder="Enter your email"
            id="form1"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ height: "50px" }}
          />
          <MDBInput
            wrapperClass="mb-4 custom-font"
            placeholder="Enter your password"
            id="form2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ height: "50px" }}
          />

          <MDBBtn
            type="submit"
            className="button mt-3 mb-4 custom-font"
            style={{ height: "50px" }}
            onClick={handleSubmit}
          >
            Sign In
            <svg fill="currentColor" viewBox="0 0 24 24" className="icon">
              <path
                clipRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                fillRule="evenodd"
              ></path>
            </svg>
          </MDBBtn>

          <div className="text-center custom-font">
            <p style={{ color: "#080808" }}>
              Not a member?{" "}
              <a href="/signup" style={{ color: "#ffffff" }}>
                <b> Register</b>
              </a>
            </p>
          </div>
        </MDBContainer>
      </div>
    </div>
  );
}

export default LoginComponent;
