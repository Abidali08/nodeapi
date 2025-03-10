# Express.js and PostgreSQL CRUD API with CORS Configuration

## Prerequisites
Before running the application, ensure you have:
- Node.js installed
- PostgreSQL database set up
- A `.env` file with the following variable:
  ```env
  DATABASE_URL=your_database_connection_string
  PORT=3000
  ```

## Installation Steps
1. **Clone the Repository (if applicable)**
   ```sh
   git clone <repo_url>
   cd <project_directory>
   ```

2. **Install Dependencies**
   ```sh
   npm install express pg cors dotenv
   ```

3. **Run the Server**
   ```sh
   node server.js
   ```
   or if using `nodemon`:
   ```sh
   nodemon server.js
   ```

---

## Server Code Explanation
### **1. Load Environment Variables**
```javascript
require("dotenv").config();
```
This loads the database connection string and port from the `.env` file.

### **2. Import Required Modules**
```javascript
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
```
- `express` - Handles routing
- `pg` - Connects to PostgreSQL
- `cors` - Enables cross-origin requests

### **3. Configure Middleware**
```javascript
const app = express();
app.use(express.json());
app.use(cors({ origin: "https://super-disco-7pj9jg69qwvcw6qx-5500.app.github.dev" }));
```
- `express.json()` - Parses incoming JSON requests
- `cors()` - Enables CORS only for a specific frontend origin

### **4. Database Connection**
```javascript
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});
```
This connects to PostgreSQL using the provided `DATABASE_URL`.

### **5. Test Database Connection**
```javascript
app.get("/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({ message: "Database Connected!", time: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
```
This route verifies if the database connection is successful.

### **6. CRUD API Routes**
#### **Regions**
- `GET /regions` - Fetch all regions
- `POST /regions` - Add a new region
- `PUT /regions/:id` - Update a region by ID
- `DELETE /regions/:id` - Delete a region by ID

#### **Countries**
- `GET /countries` - Fetch all countries
- `POST /countries` - Add a new country
- `PUT /countries/:id` - Update a country by ID
- `DELETE /countries/:id` - Delete a country by ID

#### **Employees**
- `GET /employees` - Fetch all employees
- `POST /employees` - Add a new employee
- `PUT /employees/:id` - Update an employee by ID
- `DELETE /employees/:id` - Delete an employee by ID

#### **Job History**
- `GET /job_history` - Fetch all job history
- `POST /job_history` - Add a new job history entry
- `PUT /job_history/:employee_id/:start_date` - Update job history
- `DELETE /job_history/:employee_id/:start_date` - Delete job history

#### **Departments**
- `GET /departments` - Fetch all departments
- `POST /departments` - Add a new department
- `PUT /departments/:id` - Update a department by ID
- `DELETE /departments/:id` - Delete a department by ID

### **7. Start the Server**
```javascript
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API is running on http://localhost:${PORT}`);
});
```

---

## **CORS Configuration and Fixing Issues**
### **Handling CORS Errors**
If your frontend gets blocked due to CORS, ensure the backend includes:
```javascript
app.use(cors({ origin: "https://super-disco-7pj9jg69qwvcw6qx-5500.app.github.dev" }));
```
Or, allow all origins (for development only):
```javascript
app.use(cors());
```

### **Fixing SSL Issues in PostgreSQL**
If your PostgreSQL connection fails due to SSL issues, ensure:
```javascript
ssl: { rejectUnauthorized: false }
```
is included in the `Pool` configuration.

---

## **Deployment Notes**
- **For Production**: Use environment variables for security.
- **Logging**: Consider using `morgan` for request logging.
- **Database Migrations**: Use `knex` or `sequelize` for better schema management.

---

## **Conclusion**
This Express.js API provides a fully functional CRUD system with PostgreSQL integration. The CORS configuration ensures that only allowed origins can interact with the API.

