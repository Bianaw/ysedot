const User = require('../models/user');

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, username, email, phoneNumber, password } = req.body;

    // בדוק אם המשתמש כבר קיים
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('Username already exists');
    }

    // יצירת משתמש חדש
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      phoneNumber,
      password,
    });

    await newUser.save();
    res.status(201).send('User created successfully');
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Error creating user');
  }
};

module.exports = { createUser };
