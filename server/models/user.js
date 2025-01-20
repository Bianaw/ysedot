const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    resetToken: String, // טוקן לאיפוס סיסמה
    resetTokenExpiration: Date, // זמן תפוגת הטוקן
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
