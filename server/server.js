require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const morgan = require('morgan');
const nodemailer = require("nodemailer");

// יצירת אפליקציה
const app = express();

const cors = require('cors');
// Middleware
app.use(cors({
    origin: ['http://127.0.0.1:5501', 'http://localhost:3000'], // כל המקורות שמותר להם לגשת
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // שיטות HTTP מותרות
    allowedHeaders: ['Content-Type', 'Authorization'], // כותרות מותרות
}));
app.use(morgan('dev')); // Log requests
app.use(bodyParser.json()); // עיבוד JSON
app.use(multer().none()); // עיבוד בקשות multipart/form-data
app.use(express.json()); // עיבוד JSON

// Log כל בקשה נכנסת
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.path}`);
    console.log("Request body:", req.body);
    next();
});

// חיבור ל-MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB Atlas connected successfully');
    console.log('Database Name:', mongoose.connection.db.databaseName);
})
.catch(err => {
    console.error('MongoDB connection error:', err);
    console.error('Connection string used:', process.env.MONGO_URI);
});

// ייבוא נתיבים
const userRoutes = require('./routes/userRoutes');
const apartmentsRoutes = require('./routes/apartmentRoutes');

// שימוש בנתיבים
app.use('/api/users', userRoutes);
app.use('/api/apartments', apartmentsRoutes);

// מסלול לבדיקה
app.post('/api/request-reset', (req, res) => {
    res.json({ message: "Request reset route works!" });
});

// Confirm חיבור ל-MongoDB
mongoose.connection.once('open', () => {
    console.log('MongoDB connection successful');
});

// הפעלת השרת
const PORT = process.env.PORT || 5001; // פורט ברירת מחדל
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
