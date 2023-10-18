const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/auth');

require('dotenv').config();

const secret = process.env.SECRET;

const createUserInTheDatabase = async (req, res) => {
  try {
    const {
      id, name, email, password,
    } = req.body;
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = new User({
      _id: id,
      name,
      email,
      password: passwordHash,
    });

    await user.save();

    return res.status(201).json({ message: 'User created successfully', error: false });
  } catch (err) {
    return res.status(500).json({ message: `Server error: ${err.message}`, error: true });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email } = req.body;
    const { _id } = await User.findOne({ email });

    const token = await jwt.sign({ id: _id }, secret);

    return res.status(200).json({ message: 'Successful authentication', error: false, token });
  } catch (err) {
    return res.status(500).json({ message: `Server error: ${err.message}`, error: true });
  }
};

const changeUserInformation = async (req, res) => {
  try {
    const userId = req.params.id;
    const { newPassword } = req.body;
    const user = await User.findById(userId);
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    user.password = passwordHash;
    await user.save();

    return res.status(201).json({ message: 'Password successfully updated' });
  } catch (err) {
    return res.status(500).json({ message: `Server error: ${err.message}`, error: true });
  }
};

const changePasswordWithoutLogin = async (req, res) => {
  try {
    const { newPassword, email } = req.body;
    const user = await User.findOne({ email });
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    user.password = passwordHash;
    await user.save();

    return res.status(201).json({ message: 'Password successfully updated' });
  } catch (err) {
    return res.status(500).json({ message: `Server error: ${err.message}`, error: true });
  }
};

const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    const { phone } = user;

    return res.status(201).json({ phone, error: false, message: 'User found successfully' });
  } catch (err) {
    return res.status(500).json({ message: `Server error: ${err.message}`, error: true });
  }
};

module.exports = {
  createUserInTheDatabase,
  userLogin,
  changeUserInformation,
  changePasswordWithoutLogin,
  checkEmail,
};
