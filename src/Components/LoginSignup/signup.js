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

function SignUpComponent() {
  function handleSubmit(e) {
    e.preventDefault();

    const username = document.getElementById("form1").value;
    const email = document.getElementById("form2").value;
    const password = document.getElementById("form3").value;

    if (!username || !email || !password) {
      notyf.error("All fields are required");
      return;
    }

    // Validate email format
    if (!isValidEmail(email)) {
      notyf.error("Invalid email format");
      return;
    }

    // Validate password strength
    if (!isValidPassword(password)) {
      notyf.error("Password should be at least 8 characters long");
      return;
    }

    // Send POST request to server
    fetch("http://localhost:3001/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((response) => response.text())
      .then((data) => {
        notyf.success("Signup Successful");
        console.log(data);
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      })
      .catch((error) => {
        notyf.error("Signup failed");
        console.error("Error:", error);
      });
  }

  // Function to validate email format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Function to validate password strength
  function isValidPassword(password) {
    return password.length >= 8;
  }

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
          <h1 className="fw-bold mb-5 custom-font">Sign Up</h1>

          <MDBInput
            wrapperClass="mb-4 custom-font"
            placeholder="Enter your username"
            id="form1"
            type="text"
            style={{ height: "50px" }}
          />
          <MDBInput
            wrapperClass="mb-4 custom-font"
            placeholder="Enter your email"
            id="form2"
            type="email"
            style={{ height: "50px" }}
          />
          <MDBInput
            wrapperClass="mb-4 custom-font"
            placeholder="Enter your password"
            id="form3"
            type="password"
            style={{ height: "50px" }}
          />

          <MDBBtn
            type="submit"
            className="button mt-3 mb-4 custom-font"
            style={{ height: "50px" }}
            onClick={handleSubmit}
          >
            Sign Up
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
              Already a member?{" "}
              <a href="/" style={{ color: "#ffffff" }}>
                <b> Login</b>
              </a>
            </p>
          </div>
        </MDBContainer>
      </div>
    </div>
  );
}

export default SignUpComponent;
