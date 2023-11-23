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
  phoneIsValid,
} = require('../middlewares/auth');
const {
  createUserInTheDatabase,
  userLogin,
  changePassword,
  changePasswordWithoutLogin,
  checkEmail,
  changeEmail,
  changePhone,
} = require('../controllers/auth');

const router = Router();

router.post('/signUp', idIsValid, nameIsValid, emailIsValid, passwordIsValid, createUserInTheDatabase);
router.post('/signIn', userExists, checkPassword, userLogin);
router.put('/newPassword/:id', idExists, passwordIsValid, tokenIsValid, changePassword);
router.put('/newEmail/:id', idExists, emailIsValid, tokenIsValid, changeEmail);
router.put('/newPhone/:id', idExists, phoneIsValid, tokenIsValid, changePhone);
router.put('/newPasswordWithoutLogin', userExists, passwordIsValid, changePasswordWithoutLogin);
router.get('/checkEmail', userExists, checkEmail);

module.exports = router;
