const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// GET all students
app.get('/', async (req, res) => {
    try {
      res.json('WELCOME');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// GET all students
app.get('/students', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM student');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add a new student
app.post('/students', async (req, res) => {
  const { sid, sname, contact } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO student (sid, sname, contact) VALUES ($1, $2, $3) RETURNING *',
      [sid, sname, contact]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// PUT - Update an existing student
app.put('/students/:sid', async (req, res) => {
    const { sid } = req.params;
    const { sname, contact } = req.body;
    try {
      const result = await pool.query(
        'UPDATE student SET sname = $1, contact = $2 WHERE sid = $3 RETURNING *',
        [sname, contact, sid]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // DELETE - Delete a student
  app.delete('/students/:sid', async (req, res) => {
    const { sid } = req.params;
    try {
      const result = await pool.query(
        'DELETE FROM student WHERE sid = $1 RETURNING *',
        [sid]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      res.json({ message: 'Student deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
