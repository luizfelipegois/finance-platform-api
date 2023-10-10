const { Router } = require('express');
const {
  idExists,
  tokenIsValid,
} = require('../middlewares/auth');
const { getInfoUser } = require('../controllers/user');

const router = Router();

router.get('/:id', idExists, tokenIsValid, getInfoUser);

module.exports = router;
