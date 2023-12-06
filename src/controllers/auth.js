const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/auth');
require('dotenv').config();

const secret = process.env.SECRET;

const handleServerError = (res, err) => res.status(500).json({ message: `Server error: ${err.message}`, error: true });

const createUserInTheDatabase = async (req, res) => {
  try {
    const {
      id, name, email, password,
    } = req.body;
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = new User({
      _id: id, name, email, password: passwordHash,
    });

    await user.save();

    return res.status(201).json({ message: 'User created successfully', error: false });
  } catch (err) {
    return handleServerError(res, err);
  }
};

const userLogin = async (req, res) => {
  try {
    const { email } = req.body;
    const { _id } = await User.findOne({ email });
    const token = await jwt.sign({ id: _id }, secret);

    return res.status(200).json({ message: 'Successful authentication', error: false, token });
  } catch (err) {
    return handleServerError(res, err);
  }
};

const updateUserField = async (req, res, field, message) => {
  try {
    const userId = req.params.id;
    const value = req.body[field];
    const user = await User.findById(userId);

    user[field] = value;
    await user.save();

    return res.status(201).json({ message, error: false });
  } catch (err) {
    return handleServerError(res, err);
  }
};

const changePassword = async (req, res) => {
  await updateUserField(req, res, 'password', 'Senha Atualizada');
};

const changeEmail = async (req, res) => {
  await updateUserField(req, res, 'email', 'Email Atualizado');
};

const changePhone = async (req, res) => {
  await updateUserField(req, res, 'phone', 'Número de celular Atualizado');
};

const changePasswordWithoutLogin = async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ email });
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    user.password = passwordHash;
    await user.save();

    return res.status(201).json({ message: 'Senha Atualizada', error: false });
  } catch (err) {
    return handleServerError(res, err);
  }
};

const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    const { phone } = user;

    return res.status(201).json({ phone, error: false, message: 'Usuário encontrado' });
  } catch (err) {
    return handleServerError(res, err);
  }
};

module.exports = {
  createUserInTheDatabase,
  userLogin,
  changePassword,
  changePasswordWithoutLogin,
  changeEmail,
  checkEmail,
  changePhone,
};
