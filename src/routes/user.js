const { Router } = require('express');
const {
  idExists,
  tokenIsValid,
} = require('../middlewares/auth');
const { getInfoUser, registerNewRequest } = require('../controllers/user');
const { requestIsValid } = require('../middlewares/user');

const router = Router();

router.get('/:id', idExists, tokenIsValid, getInfoUser);
router.put('/requests/:id', idExists, requestIsValid, tokenIsValid, registerNewRequest);
router.put('/deposit/:id', idExists, requestIsValid, tokenIsValid, registerNewRequest);

module.exports = router;
