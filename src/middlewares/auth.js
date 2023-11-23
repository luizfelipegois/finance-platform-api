const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/auth');

const idIsValid = (req, res, next) => {
  try {
    const { id } = req.body;

    if (!id) return res.status(422).json({ message: 'id is required', error: true });

    return next();
  } catch (err) {
    return res.status(500).json({ message: `Server error: ${err.message}'`, error: true });
  }
};

const nameIsValid = (req, res, next) => {
  try {
    const { name } = req.body;
    const regex = /^[a-zA-ZÀ-ÿ ]+$/;

    if (!name) return res.status(422).json({ message: 'Name is required', error: true });
    if (name.length < 3) return res.status(422).json({ message: 'Name requires a minimum of 3 characters', error: true });
    if (!regex.test(name)) return res.status(422).json({ message: 'Name cannot have numbers or special characters (@, $, !, %, *, ?, or &)', error: true });

    return next();
  } catch (err) {
    return res.status(500).json({ message: `Server error: ${err.message}'`, error: true });
  }
};

const emailIsValid = async (req, res, next) => {
  try {
    const { email } = req.body;
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const user = await User.findOne({ email });

    if (!email) return res.status(422).json({ message: 'Email é necessário', error: true });
    if (!regex.test(email)) return res.status(422).json({ message: 'Formato de Email Inválido', error: true });
    if (user) return res.status(422).json({ message: 'Email já registrado', error: true });

    return next();
  } catch (err) {
    return res.status(500).json({ message: `Server error: ${err.message}'`, error: true });
  }
};

const phoneIsValid = async (req, res, next) => {
  try {
    const { phone } = req.body;
    const regex = /^(\+[0-9])((?!\1)[0-9]){12}$/;
    const user = await User.findOne({ phone });

    if (!phone) return res.status(422).json({ message: 'Número de telefone é necessário', error: true });
    if (!regex.test(phone)) return res.status(422).json({ message: 'Formato inválido', error: true });
    if (user) return res.status(422).json({ message: 'Número de telefone já registrado', error: true });

    return next();
  } catch (err) {
    return res.status(500).json({ message: `Server error: ${err.message}'`, error: true });
  }
};

const passwordIsValid = (req, res, next) => {
  try {
    const { password } = req.body;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!password) return res.status(422).json({ message: 'Senha é necessária', error: true });
    if (!regex.test(password)) return res.status(422).json({ message: 'A senha deve conter pelo menos 8 caracteres e incluir pelo menos um caractere minúsculo, um caractere maiúsculo, um dígito e um caractere especial (@, $, !, %, *, ?, ou &)', error: true });

    return next();
  } catch (err) {
    return res.status(500).json({ message: `Server error: ${err.message}'`, error: true });
  }
};

const userExists = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(422).json({ message: 'Usuário não encontrado', error: true });

    return next();
  } catch (err) {
    return res.status(500).json({ message: `Server error: ${err.message}'`, error: true });
  }
};

const idExists = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) return res.status(422).json({ message: 'Usuário não encontrado', error: true });

    return next();
  } catch (err) {
    return res.status(500).json({ message: `Server error: ${err.message}'`, error: true });
  }
};

const checkPassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!password) return res.status(422).json({ message: 'Senha é necessária', error: true });
    if (!email) return res.status(422).json({ message: 'Email é necessário', error: true });

    const user = await User.findOne({ email });
    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    if (!passwordIsCorrect) return res.status(422).json({ message: 'Senha incorreta', error: true });

    return next();
  } catch (err) {
    return res.status(500).json({ message: `Server error: ${err.message}'`, error: true });
  }
};

const tokenIsValid = async (req, res, next) => {
  try {
    const { token } = req.headers;
    const secret = process.env.SECRET;
    const { id } = req.params;

    if (!token) return res.status(511).json({ message: 'Token é necessario', error: true });
    if (!jwt.verify(token, secret)) return res.status(511).json({ message: 'Acesso negado', error: true });

    const data = await jwt.decode(token, { payload: true });

    if (id !== data.id) return res.status(511).json({ message: 'Acesso negado', error: true });

    return next();
  } catch (error) {
    return res.status(500).json({ message: 'Acesso negado', error: true, errorMessage: error });
  }
};

module.exports = {
  idIsValid,
  nameIsValid,
  emailIsValid,
  passwordIsValid,
  userExists,
  checkPassword,
  idExists,
  tokenIsValid,
  phoneIsValid,
};
