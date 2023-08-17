const { Router } = require('express');
const {
  idIsValid,
  nameIsValid,
  emailIsValid,
  passwordIsValid,
  checkPassword,
  userExists,
  idExists,
  tokenIsValid,
  checkNewPassword,
} = require('../middlewares/auth');
const { createUserInTheDatabase, userLogin, changeUserInformation } = require('../controllers/auth');

const router = Router();

router.post('/signUp', idIsValid, nameIsValid, emailIsValid, passwordIsValid, createUserInTheDatabase);
router.post('/signIn', userExists, checkPassword, userLogin);
router.put('/:id', idExists, checkNewPassword, tokenIsValid, changeUserInformation);

module.exports = router;
