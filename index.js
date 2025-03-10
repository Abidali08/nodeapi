require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");



const app = express();
app.use(express.json());
// app.use(cors());
app.use(cors({ origin: "https://super-disco-7pj9jg69qwvcw6qx-5500.app.github.dev" }));

// Database Connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

// ✅ Test Database Connection
app.get("/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({ message: "Database Connected!", time: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// CRUD API for Regions
app.get("/regions", async (req, res) => {
    const result = await pool.query("SELECT * FROM regions");
    res.json(result.rows);
});

app.post("/regions", async (req, res) => {
    const { region_name } = req.body;
    const result = await pool.query("INSERT INTO regions (region_name) VALUES ($1) RETURNING *", [region_name]);
    res.json(result.rows[0]);
});

app.put("/regions/:id", async (req, res) => {
    const { id } = req.params;
    const { region_name } = req.body;
    const result = await pool.query("UPDATE regions SET region_name = $1 WHERE region_id = $2 RETURNING *", [region_name, id]);
    res.json(result.rows[0]);
});

app.delete("/regions/:id", async (req, res) => {
    const { id } = req.params;
    await pool.query("DELETE FROM regions WHERE region_id = $1", [id]);
    res.json({ message: "Region deleted" });
});

// CRUD API for Countries
app.get("/countries", async (req, res) => {
    const result = await pool.query("SELECT * FROM countries");
    res.json(result.rows);
});

app.post("/countries", async (req, res) => {
    const { country_id, country_name, region_id } = req.body;
    const result = await pool.query("INSERT INTO countries (country_id, country_name, region_id) VALUES ($1, $2, $3) RETURNING *", [country_id, country_name, region_id]);
    res.json(result.rows[0]);
});

app.put("/countries/:id", async (req, res) => {
    const { id } = req.params;
    const { country_name, region_id } = req.body;
    const result = await pool.query("UPDATE countries SET country_name = $1, region_id = $2 WHERE country_id = $3 RETURNING *", [country_name, region_id, id]);
    res.json(result.rows[0]);
});

app.delete("/countries/:id", async (req, res) => {
    const { id } = req.params;
    await pool.query("DELETE FROM countries WHERE country_id = $1", [id]);
    res.json({ message: "Country deleted" });
});

// CRUD API for Employees
app.get("/employees", async (req, res) => {
    const result = await pool.query("SELECT * FROM employees");
    res.json(result.rows);
});

app.post("/employees", async (req, res) => {
    const { first_name, last_name, email, phone_number, hire_date, job_id, salary, commission_pct, manager_id, department_id } = req.body;
    const result = await pool.query("INSERT INTO employees (first_name, last_name, email, phone_number, hire_date, job_id, salary, commission_pct, manager_id, department_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *", [first_name, last_name, email, phone_number, hire_date, job_id, salary, commission_pct, manager_id, department_id]);
    res.json(result.rows[0]);
});

app.put("/employees/:id", async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, phone_number, hire_date, job_id, salary, commission_pct, manager_id, department_id } = req.body;
    const result = await pool.query("UPDATE employees SET first_name = $1, last_name = $2, email = $3, phone_number = $4, hire_date = $5, job_id = $6, salary = $7, commission_pct = $8, manager_id = $9, department_id = $10 WHERE employee_id = $11 RETURNING *", [first_name, last_name, email, phone_number, hire_date, job_id, salary, commission_pct, manager_id, department_id, id]);
    res.json(result.rows[0]);
});

app.delete("/employees/:id", async (req, res) => {
    const { id } = req.params;
    await pool.query("DELETE FROM employees WHERE employee_id = $1", [id]);
    res.json({ message: "Employee deleted" });
});

// CRUD API for Job History
app.get("/job_history", async (req, res) => {
    const result = await pool.query("SELECT * FROM job_history");
    res.json(result.rows);
});

app.post("/job_history", async (req, res) => {
    const { employee_id, start_date, end_date, job_id, department_id } = req.body;
    const result = await pool.query("INSERT INTO job_history (employee_id, start_date, end_date, job_id, department_id) VALUES ($1, $2, $3, $4, $5) RETURNING *", [employee_id, start_date, end_date, job_id, department_id]);
    res.json(result.rows[0]);
});

app.put("/job_history/:employee_id/:start_date", async (req, res) => {
    const { employee_id, start_date } = req.params;
    const { end_date, job_id, department_id } = req.body;
    const result = await pool.query("UPDATE job_history SET end_date = $1, job_id = $2, department_id = $3 WHERE employee_id = $4 AND start_date = $5 RETURNING *", [end_date, job_id, department_id, employee_id, start_date]);
    res.json(result.rows[0]);
});

app.delete("/job_history/:employee_id/:start_date", async (req, res) => {
    const { employee_id, start_date } = req.params;
    await pool.query("DELETE FROM job_history WHERE employee_id = $1 AND start_date = $2", [employee_id, start_date]);
    res.json({ message: "Job history record deleted" });
});


// CRUD API for Departments
app.get("/departments", async (req, res) => {
    const result = await pool.query("SELECT * FROM departments");
    res.json(result.rows);
});

app.post("/departments", async (req, res) => {
    const { department_name, manager_id, location_id } = req.body;
    const result = await pool.query("INSERT INTO departments (department_name, manager_id, location_id) VALUES ($1, $2, $3) RETURNING *", [department_name, manager_id, location_id]);
    res.json(result.rows[0]);
});

app.put("/departments/:id", async (req, res) => {
    const { id } = req.params;
    const { department_name, manager_id, location_id } = req.body;
    const result = await pool.query("UPDATE departments SET department_name = $1, manager_id = $2, location_id = $3 WHERE department_id = $4 RETURNING *", [department_name, manager_id, location_id, id]);
    res.json(result.rows[0]);
});

app.delete("/departments/:id", async (req, res) => {
    const { id } = req.params;
    await pool.query("DELETE FROM departments WHERE department_id = $1", [id]);
    res.json({ message: "Department deleted" });
});

// ✅ Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 API is running on http://localhost:${PORT}`);
});
