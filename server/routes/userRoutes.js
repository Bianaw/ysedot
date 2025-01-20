const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken'); // לצורך יצירת טוקן
const router = express.Router();
const User = require('../models/user'); // ייבוא מודל המשתמש

const SECRET_KEY = "your_secret_key"; // סוד ליצירת JWT

const { createUser } = require('../controllers/userController');
const nodemailer = require('nodemailer');



// נתיב הרשמה
router.post('/signup', async (req, res) => {
    try {

        console.log("User Data:", req.body);

        //console.log('Request body:', req.body); // הדפס את הבקשה
        const { firstName, lastName, username, password, email, phoneNumber } = req.body;

        if (!firstName || !lastName || !username || !password || !email || !phoneNumber) {
            console.log("Missing fields"); // לוג במקרה שחסרים שדות
            return res.status(400).send("All fields are required");
        }

         // בדוק אם username או email כבר קיימים
         const existingUser = await User.findOne({ $or: [{ username }, { email }] });
         if (existingUser) {
             if (existingUser.username === username) {
                 return res.status(400).send("Username already exists.");
             } else if (existingUser.email === email) {
                 return res.status(400).send("Email already exists.");
             }
         }
        

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            username,
            password: hashedPassword,
            email,
            phoneNumber
        });

        console.log(user)
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

        // חפש את המשתמש במסד הנתונים
        const user = await User.findOne({ username });
        if (!user) {
           // console.log("Username not found:", username);
            return res.status(400).send({ message: "Invalid username or password." });
        }

        // השווה את הסיסמה המוזנת לסיסמה המוצפנת
        const isPasswordValid = await bcrypt.compare(password, user.password);
       // console.log("Password comparison result:", isPasswordValid); // הדפס אם ההשוואה מצליחה

        if (!isPasswordValid) {
            return res.status(400).send({ message: "Invalid username or password." });
        }

        // אם הסיסמה תקינה
        res.status(200).send({ message: "Login successful", username: user.username });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send({ message: "An error occurred during login." });
    }
});

router.post("/retrieve-password", async (req, res) => {
    const { username, email } = req.body;

    if (!username || !email) {
        return res.status(400).json({ message: "Username and email are required." });
    }

    try {
        // חיפוש המשתמש לפי שם משתמש ואימייל
        const user = await User.findOne({ username, email });

        if (!user) {
            return res.status(404).json({ message: "User not found or email does not match." });
        }

        // החזרת הסיסמה (במציאות, לא מומלץ לחשוף סיסמה כך)
        return res.json({ password: user.password });
    } catch (error) {
        console.error("Error retrieving password:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

const app = express();
app.use(express.json());

// מסלול לטיפול בבקשות שחזור סיסמה
app.post('/api/request-reset', (req, res) => {
    res.status(200).json({ message: 'Reset route works!' });
});

// הרצת השרת
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});


// מסלול לבקשת שחזור סיסמה
router.post('/request-reset', async (req, res) => {
  const { email } = req.body;
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(404).json({ message: 'Email not found' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 3600000; // שעה אחת

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  const resetLink = `http://localhost:5000/reset-password.html?token=${token}`;
  try {
    await transporter.sendMail({
      to: email,
      subject: 'Password Reset',
      html: `<p>Click the link below to reset your password:</p><a href="${resetLink}">Reset Password</a>`,
    });

    res.json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

// מסלול לשינוי סיסמה
router.post('/reset-password', (req, res) => {
  const { password, token } = req.body;

  const user = users.find(u => u.resetToken === token && u.resetTokenExpiry > Date.now());

  if (!user) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }

  user.password = password; // הצפיני את הסיסמה בפועל
  user.resetToken = null;
  user.resetTokenExpiry = null;

  res.json({ message: 'Password successfully reset' });
});


module.exports = router;
