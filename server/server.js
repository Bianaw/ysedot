
require('dotenv').config();
const nodemailer = require("nodemailer");
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer'); // לסוג multipart/form-data
const axios = require('axios'); // עבור CommonJS
const app = express();
app.use(cors());
app.use(bodyParser.json());
const upload = multer(); // יצירת אינסטנס של multer
app.use(upload.none()); // מתמודד עם בקשות multipart/form-data
const morgan = require('morgan');
app.use(morgan('dev'));

// Log incoming requests
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.path}`);
    console.log("Request body:", req.body);
    next();
});
// Import routes
const userRoutes = require('./routes/userRoutes');
app.use(express.json());
app.use('/api/users', userRoutes);


// Connect to MongoDB
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

// Confirm MongoDB connection
mongoose.connection.once('open', () => {
    console.log('MongoDB connection successful');
});

// Start the server
const PORT = process.env.PORT || 5001; // ודא שהפורט תואם לקריאות שלך
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.post('/api/request-reset', (req, res) => {
    res.json({ message: "Request reset route works!" });
});
