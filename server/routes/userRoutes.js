const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken'); // לצורך יצירת טוקן
const router = express.Router();
const User = require('../models/user'); // ייבוא מודל המשתמש
const crypto = require("crypto");
const SECRET_KEY = "your_secret_key"; // סוד ליצירת JWT

const { createUser } = require('../controllers/userController');
const nodemailer = require('nodemailer');

const resetTokens = {};

const multer = require("multer");
const upload = multer(); // הגדרה לטיפול בנתוני טפסים

//נתיב הרשמה 
router.post('/signup', express.json(), async (req, res) => {
    try {
        console.log("User Data:", req.body);

        const { firstName, lastName, username, password, email, phoneNumber } = req.body;

        if (!firstName || !lastName || !username || !password || !email || !phoneNumber) {
            console.log("Missing fields");
            return res.status(400).send("All fields are required");
        }

        // בדיקת משתמשים קיימים
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            if (existingUser.username === username) {
                return res.status(400).send("Username already exists.");
            } else if (existingUser.email === email) {
                return res.status(400).send("Email already exists.");
            }
        }

        // הצפנת סיסמה
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            username,
            password: hashedPassword,
            email,
            phoneNumber
        });

        console.log(user);
        await user.save();
        console.log("User registered successfully");
        res.status(201).send("User registered successfully");
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).send("An error occurred during signup");
    }
});


// נתיב התחברות
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("Login attempt:", { username, password }); // הדפסת נתונים לבדיקה

        // חפש את המשתמש במסד הנתונים
        const user = await User.findOne({ username });
        if (!user) {
            console.log("Username not found:", username);
            return res.status(400).send({ message: "Invalid username or password." });
        }

        // השווה את הסיסמה המוזנת לסיסמה המוצפנת
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send({ message: "Invalid username or password." });
        }

        // אם הסיסמה תקינה
        console.log("Login successful for user:", username);
        res.status(200).send({ 
            message: "Login successful", 
            username: user.username, 
            firstName: user.firstName, 
            lastName: user.lastName 
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send({ message: "An error occurred during login." });
    }
});

// מסלול לבקשה לשחזור סיסמה
router.post("/request-reset", async (req, res) => {
    try {
        const { username, email } = req.body;

        // בדיקת נתוני קלט
        if (!username || !email) {
            return res.status(400).send({ message: "Username and email are required." });
        }

        // יצירת טוקן לשחזור
        const token = crypto.randomBytes(32).toString("hex");
        resetTokens[token] = { username, email, expires: Date.now() + 3600000 }; // שעה תוקף

        const resetLink = `http://localhost:5001/reset-password.html?token=${token}`;

        // שליחת מייל
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "awadbayan560@gmail.com",
                pass: "your-app-password", // השתמש בסיסמת אפליקציה אם Gmail
            },
        });

        const mailOptions = {
            from: "awadbayan560@gmail.com",
            to: email,
            subject: "Password Reset",
            text: `Hello ${username}, click the link below to reset your password:\n${resetLink}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).send({ message: "Password reset email sent successfully." });
    } catch (err) {
        console.error("Error sending email:", err);
        res.status(500).send({ message: "Failed to send email." });
    }
});

// מסלול לעדכון סיסמה
router.post("/reset-password", async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        // בדיקת טוקן
        if (!resetTokens[token] || resetTokens[token].expires < Date.now()) {
            return res.status(400).send({ message: "Invalid or expired token." });
        }

        const { email } = resetTokens[token];
        delete resetTokens[token]; // מחיקת הטוקן לאחר שימוש

        // עדכון סיסמה
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        console.log(`Updated password for ${email}: ${hashedPassword}`); // הדמיה בלבד

        // כאן יש לעדכן את הסיסמה במסד הנתונים
        
        res.status(200).send({ message: "Password updated successfully." });
    } catch (err) {
        console.error("Error updating password:", err);
        res.status(500).send({ message: "An error occurred while updating the password." });
    }
});


module.exports = router;
