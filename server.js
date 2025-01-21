const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 3000;

app.use(express.json());


const db = mysql.createConnection({
  host: "eval-vm",
  user: "eval-db",
  password: "",
  database: "tasks_db",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database");
});

// CRUD Endpoints
// GET /tasks: Retrieve all tasks
app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// POST /tasks: Add a new task
app.post("/tasks", (req, res) => {
  const { title, description } = req.body;
  const query = "INSERT INTO tasks (title, description) VALUES (?, ?)";
  db.query(query, [title, description], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({
      id: result.insertId,
      title,
      description,
    });
  });
});

// PUT /tasks/:id: Update a task
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const query = "UPDATE tasks SET title = ?, description = ? WHERE id = ?";
  db.query(query, [title, description, id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: "Task updated successfully" });
  });
});

// DELETE /tasks/:id: Delete a task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM tasks WHERE id = ?";
  db.query(query, [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: "Task deleted successfully" });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
