// node -e "console.log(require('crypto').randomBytes(32).toString('hex'))" generate new tokens

const express = require("express");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require("../db");

dotenv.config(); // Load .env file

const router = express.Router();

//REGISTER ROUTE
router.post("/register", (req, res) => {
    const { email, password } = req.body;
    const userID = uuidv4();
    const saltRounds = 10;

    // Check if email already exists
    const checkEmailQuery = "SELECT id FROM users WHERE email = ?";
    db.query(checkEmailQuery, [email], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (results.length > 0) {
            return res.status(400).json({ error: "Email already in use" });
        }

        // Hash the password before storing it
        bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
            if (err) {
                console.error("Error hashing password:", err);
                return res.status(500).json({ error: "Error processing password" });
            }

            const insertQuery = "INSERT INTO users (id, email, pass) VALUES (?, ?, ?)";
            db.query(insertQuery, [userID, email, hashedPassword], (err, result) => {
                if (err) {
                    console.error("Error inserting user:", err);
                    return res.status(500).json({ error: "Database error" });
                }
                res.status(201).json({ message: "User added successfully", userID });
            });
        });
    });
});

// LOGIN ROUTE
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    const selectQuery = "SELECT id, pass FROM users WHERE email = ?";
    db.query(selectQuery, [email], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const user = results[0];

        // Compare provided password with stored hashed password
        bcrypt.compare(password, user.pass, (err, isMatch) => {
            if (err) {
                console.error("Error comparing password:", err);
                return res.status(500).json({ error: "Error processing password" });
            }

            if (!isMatch) {
                return res.status(401).json({ error: "Invalid email or password" });
            }

            // Generate JWT token with environment secret
            const token = jwt.sign(
                { userID: user.id, email, jti: uuidv4() }, 
                process.env.JWT_SECRET, 
                { expiresIn: "1h" }
            );

            res.status(200).json({ message: "Login successful", token , userID: user.id });
        });
    });
});

module.exports = router;

