require('dotenv').config();
const nodemailer = require("nodemailer");
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const morgan = require('morgan');
//const fs = require('fs'); // דרוש ליצירת תיקיות
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
const upload = multer();
app.use(upload.none()); // מתמודד עם בקשות multipart/form-data
app.use(morgan('dev')); // לוגינג של בקשות נכנסות

app.use(express.json()); // תמיכה בבקשות JSON
app.use(express.urlencoded({ extended: true })); // תמיכה בנתוני טפסים


// לוג של בקשות נכנסות
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.path}`);
    console.log("Request body:", req.body);
    next();
});

// Import routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// MongoDB connection
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

mongoose.connection.once('open', () => {
    console.log('MongoDB connection successful');
});

// Default route (optional, for testing)
app.get('/', (req, res) => {
    res.send("Server is running. Welcome to the API!");
});

// Handle errors for undefined routes
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

// Handle global server errors
app.use((err, req, res, next) => {
    console.error("Global error handler:", err);
    res.status(500).json({ message: "Internal server error" });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

