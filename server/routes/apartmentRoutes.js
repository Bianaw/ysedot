const express = require('express');
const router = express.Router();

router.post('/add', async (req, res) => {
    const { title, price, rooms, size, floor, type, description, features, furniture, phoneNumber, galleryFolder, imageCount } = req.body;

    try {
        // לוגיקה לטיפול בהוספת דירה
        console.log("Adding apartment:", req.body);
        res.status(201).json({ message: "Apartment added successfully" });
    } catch (error) {
        console.error("Error adding apartment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
