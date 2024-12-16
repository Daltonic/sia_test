// File: app.js

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to SQLite Database
const db = new sqlite3.Database(path.join(__dirname, 'booksDB.sqlite'), (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to SQLite database');
});

// Create books table if not exists
db.run(`CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    pages INTEGER NOT NULL,
    published TEXT NOT NULL
)`);

// Routes

// Add this route after your other routes
app.get('/', (req, res) => {
  res.send('Welcome to the Book Management API!');
});

// Create a new book
app.post('/books', (req, res) => {
    const { title, author, pages, published } = req.body;
    const sql = `INSERT INTO books (title, author, pages, published) VALUES (?, ?, ?, ?)`;
    db.run(sql, [title, author, pages, published], function (err) {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.status(201).json({ id: this.lastID, title, author, pages, published });
    });
});

// Get all books
app.get('/books', (req, res) => {
    const sql = `SELECT * FROM books`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json(rows);
    });
});

// Get a book by ID
app.get('/books/:id', (req, res) => {
    const sql = `SELECT * FROM books WHERE id = ?`;
    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(row);
    });
});

// Update a book by ID
app.put('/books/:id', (req, res) => {
    const { title, author, pages, published } = req.body;
    const sql = `UPDATE books SET title = ?, author = ?, pages = ?, published = ? WHERE id = ?`;
    db.run(sql, [title, author, pages, published, req.params.id], function (err) {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ id: req.params.id, title, author, pages, published });
    });
});

// Delete a book by ID
app.delete('/books/:id', (req, res) => {
    const sql = `DELETE FROM books WHERE id = ?`;
    db.run(sql, [req.params.id], function (err) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
    });
});

// Start the server
const PORT = 9000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
