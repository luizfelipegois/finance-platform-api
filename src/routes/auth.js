const { Router } = require('express');
const {
  idIsValid,
  nameIsValid,
  emailIsValid,
  passwordIsValid,
} = require('../middlewares/auth');
const { createUserInTheDatabase } = require('../controllers/auth');

const router = Router();

router.post('/signUp', idIsValid, nameIsValid, emailIsValid, passwordIsValid, createUserInTheDatabase);

module.exports = router;
