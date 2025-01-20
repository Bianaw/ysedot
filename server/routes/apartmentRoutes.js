const express = require("express");
const router = express.Router();

// מסלול להוספת דירה
router.post("/add", (req, res) => {
    const apartmentData = req.body;
    console.log("Received apartment data:", apartmentData);
    res.status(200).send({ message: "Apartment added successfully!" });
});

module.exports = router;
