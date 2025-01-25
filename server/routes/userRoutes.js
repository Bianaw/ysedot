const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
const Apartment = require('../models/apartment');
const mongoose = require("mongoose");

// -----------------------------------
// User Signup
// -----------------------------------
router.post('/signup', express.json(), async (req, res) => {
    try {
        const { firstName, lastName, username, password, email, phoneNumber } = req.body;

        if (!firstName || !lastName || !username || !password || !email || !phoneNumber) {
            return res.status(400).send("All fields are required");
        }

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

        await user.save();
        res.status(201).send("User registered successfully");
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).send("An error occurred during signup");
    }
});

// -----------------------------------
// User Login
// -----------------------------------
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send({ message: "Invalid username or password." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send({ message: "Invalid username or password." });
        }

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

// -----------------------------------
// Add Apartment
// -----------------------------------
router.post('/add-apartment', async (req, res) => {
    try {
        const {
            title, price, rooms, size, floor, type,
            description, features, furniture, phoneNumber, images
        } = req.body;

        if (!title || !price || !rooms || !size || !floor || !type || !description || !furniture || !phoneNumber || !images) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const apartment = new Apartment({
            title,
            price: Number(price),
            rooms: Number(rooms),
            size: Number(size),
            floor,
            type,
            description,
            features: features ? features.split(',').map(f => f.trim()) : [],
            furniture,
            phoneNumber,
            images
        });

        const savedApartment = await apartment.save();
        console.log("Apartment saved successfully:", savedApartment);
        res.status(201).json({ message: 'Apartment added successfully', apartment: savedApartment });
    } catch (error) {
        console.error('Error adding apartment:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// -----------------------------------
// Fetch All Apartments
// -----------------------------------
router.get('/apartments', async (req, res) => {
    try {
        const apartments = await Apartment.find();
        res.status(200).json(apartments);
    } catch (error) {
        console.error('Error fetching apartments:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// -----------------------------------
// Fetch Apartment by ID
// -----------------------------------
router.get('/apartments/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid apartment ID' });
        }

        const apartment = await Apartment.findById(id);
        if (!apartment) {
            return res.status(404).json({ message: 'Apartment not found' });
        }

        res.status(200).json(apartment);
    } catch (error) {
        console.error('Error fetching apartment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// -----------------------------------
// Update Apartment
// -----------------------------------
router.put('/apartments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid apartment ID' });
        }

        const updatedApartment = await Apartment.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updatedApartment) {
            return res.status(404).json({ message: 'Apartment not found' });
        }

        res.status(200).json({ message: 'Apartment updated successfully', apartment: updatedApartment });
    } catch (error) {
        console.error('Error updating apartment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.get('/apartments/:id', async (req, res) => {
  try {
    const apartmentId = req.params.id;

    console.log("Received request for apartment ID:", apartmentId); // Debugging log

    const apartment = await Apartment.findById(apartmentId);
    if (!apartment) {
      return res.status(404).json({ message: 'Apartment not found' });
    }

    res.status(200).json(apartment);
  } catch (error) {
    console.error('Error fetching apartment:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

router.get('/search', async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ message: 'Please provide a search query.' });
    }

    try {
        // חיפוש במסד הנתונים לפי כותרת, תיאור או כתובת
        const results = await Apartment.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { address: { $regex: query, $options: 'i' } },
            ],
        });

        res.json(results);
    } catch (error) {
        console.error('Error during search:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = router;
