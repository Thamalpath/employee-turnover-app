const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;

// Create a MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "turnover_db",
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err.stack);
    return;
  }
  console.log("Connected to the database");
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle POST request for signup
app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send("All fields are required");
  }

  const sql =
    "INSERT INTO `users` (`Username`, `Email`, `Password`) VALUES (?, ?, ?)";

  connection.query(sql, [username, email, password], (err, result) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      return res.status(500).send(`Error inserting data: ${err.message}`);
    }
    console.log("Data inserted:", result);
    res.send("Signup successful");
  });
});

// Handle POST request for login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = "SELECT * FROM `users` WHERE `Email` = ? AND `Password` = ?";

  connection.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      return res.status(500).json({ message: "Error executing query" });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = result[0];
    console.log("Login successful");
    res.json({ message: "Login successful", user });
  });
});

// Route to fetch prediction history
app.get("/predictions", (req, res) => {
  const sql = "SELECT * FROM predictions";
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error retrieving prediction history:", err);
      res.status(500).json({ error: "Error retrieving prediction history" });
      return;
    }
    res.json(results);
  });
});

// Handle POST request to add an employee
app.post("/addEmployee", (req, res) => {
  const {
    EmployeeName,
    Education,
    JoiningYear,
    City,
    PaymentTier,
    Age,
    Gender,
    EverBenched,
    ExperienceInCurrentDomain,
  } = req.body;

  const sql = `
    INSERT INTO employees (
      EmployeeName,
      Education,
      JoiningYear,
      City,
      PaymentTier,
      Age,
      Gender,
      EverBenched,
      ExperienceInCurrentDomain
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    sql,
    [
      EmployeeName,
      Education,
      JoiningYear,
      City,
      PaymentTier,
      Age,
      Gender,
      EverBenched,
      ExperienceInCurrentDomain,
    ],
    (err, result) => {
      if (err) {
        console.error("Error executing query:", err.stack);
        return res.status(500).json({ success: false });
      }
      console.log("Employee added:", result);
      res.json({ success: true, message: "Employee data added successfully" });
    }
  );
});

// Handle GET request to fetch employees
app.get("/getEmployees", (req, res) => {
  const sql = "SELECT * FROM employees";

  connection.query(sql, (err, result) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      return res.status(500).json({ success: false });
    }
    console.log("Fetched employees:", result);
    res.json({
      success: true,
      employees: result,
      message: "Employee data retrieved successfully",
    });
  });
});

// Handle PUT request to update an employee
app.put("/updateEmployee", (req, res) => {
  const {
    EmployeeName,
    Education,
    JoiningYear,
    City,
    PaymentTier,
    Age,
    Gender,
    EverBenched,
    ExperienceInCurrentDomain,
  } = req.body;

  const sql = `
    UPDATE employees SET
      EmployeeName = ?,
      Education = ?,
      JoiningYear = ?,
      City = ?,
      PaymentTier = ?,
      Age = ?,
      Gender = ?,
      EverBenched = ?,
      ExperienceInCurrentDomain = ?
    WHERE EmployeeName = ?
  `;

  connection.query(
    sql,
    [
      EmployeeName,
      Education,
      JoiningYear,
      City,
      PaymentTier,
      Age,
      Gender,
      EverBenched,
      ExperienceInCurrentDomain,
      EmployeeName,
    ],
    (err, result) => {
      if (err) {
        console.error("Error executing query:", err.stack);
        return res.status(500).json({ success: false });
      }
      console.log("Employee updated:", result);
      res.json({
        success: true,
        message: "Employee data updated successfully",
      });
    }
  );
});

// Handle DELETE request to delete an employee
app.delete("/deleteEmployee", (req, res) => {
  const { EmployeeName } = req.body;

  const sql = `
    DELETE FROM employees
    WHERE EmployeeName = ?
  `;

  connection.query(sql, [EmployeeName], (err, result) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      return res.status(500).json({ success: false });
    }
    console.log("Employee deleted:", result);
    res.json({ success: true, message: "Employee data deleted successfully" });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
