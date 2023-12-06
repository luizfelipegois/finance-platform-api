const { Router } = require('express');
const {
  id, name, email, password, userExists, checkPassword, idExists, tokenIsValid, phone,
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

router.post('/signUp', id, name, email, password, createUserInTheDatabase);
router.post('/signIn', userExists, checkPassword, userLogin);
router.put('/newPassword/:id', idExists, password, tokenIsValid, changePassword);
router.put('/newEmail/:id', idExists, email, tokenIsValid, changeEmail);
router.put('/newPhone/:id', idExists, phone, tokenIsValid, changePhone);
router.put('/newPasswordWithoutLogin', userExists, password, changePasswordWithoutLogin);
router.get('/checkEmail', userExists, checkEmail);

module.exports = router;
