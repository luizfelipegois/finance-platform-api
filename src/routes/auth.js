const { Router } = require('express');
const {
  idIsValid,
  nameIsValid,
  emailIsValid,
  passwordIsValid,
  checkPassword,
  userExists,
} = require('../middlewares/auth');
const { createUserInTheDatabase, userLogin } = require('../controllers/auth');

const router = Router();

router.post('/signUp', idIsValid, nameIsValid, emailIsValid, passwordIsValid, createUserInTheDatabase);
router.post('/signIn', userExists, checkPassword, userLogin);

module.exports = router;
