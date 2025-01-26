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

router.post('/signup', upload.none(), async (req, res) => {
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

// account details route 
router.post('/getUserDetails', async (req, res) => {
    const { username } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
        });
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// change email route
router.post('/changeEmail', async (req, res) => {
    const { currentEmail, newEmail } = req.body;

    if (!currentEmail || !newEmail) {
        return res.status(400).json({ message: 'Both current and new email are required' });
    }

    try {
        // Check if current email exists
        const user = await User.findOne({ email: currentEmail });
        if (!user) {
            return res.status(404).json({ message: 'Current email not found' });
        }

        // Check if new email is already in use
        const emailExists = await User.findOne({ email: newEmail });
        if (emailExists) {
            return res.status(400).json({ message: 'New email is already in use' });
        }

        // Update the user's email
        user.email = newEmail;
        await user.save();

        res.status(200).json({ message: 'Email updated successfully' });
    } catch (error) {
        console.error('Error updating email:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// verify the password 
router.post('/verifyPassword', async (req, res) => {
    const { email, currentPassword } = req.body;

    if (!email || !currentPassword) {
        return res.status(400).json({ message: 'Email and current password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        res.status(200).json({ message: 'Verification successful' });
    } catch (error) {
        console.error('Error verifying password:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// change the password and update 
router.post('/changePassword', async (req, res) => {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({ message: 'Email and new password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});





module.exports = router;
