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
const {
  createUserInTheDatabase,
  userLogin,
  changeUserInformation,
  changePasswordWithoutLogin,
  checkEmail,
} = require('../controllers/auth');

const router = Router();

router.post('/signUp', idIsValid, nameIsValid, emailIsValid, passwordIsValid, createUserInTheDatabase);
router.post('/signIn', userExists, checkPassword, userLogin);
router.put('/:id', idExists, checkNewPassword, tokenIsValid, changeUserInformation);
router.patch('/newPassword', checkNewPassword, changePasswordWithoutLogin);
router.put('/checkEmail', userExists, checkEmail);

module.exports = router;
