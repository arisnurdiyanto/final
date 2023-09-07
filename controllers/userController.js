const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/jwt');
const Resident = require('../models/masyarakat');
const News = require('../models/News');

exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

exports.changePassword = async (req, res) => {
    try {
      const { userId } = req.user;
      const { newPassword } = req.body;
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      user.password = hashedPassword;
      await user.save();
  
      res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Password change failed' });
    }
};

exports.getResidents = async (req, res) => {
    try {
      const residents = await Resident.find();
  
      res.status(200).json(residents);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch residents' });
    }
};

exports.getNews = async (req, res) => {
    try {
      const news = await News.find().sort({ date: -1 }); 
      res.status(200).json(news);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch news' });
    }
};