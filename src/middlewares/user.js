const User = require('../models/auth');

const validateWithdrawal = (request, available) => {
  const requestAmount = parseFloat(request.replace(/[,.]/g, ''));
  const availableAmount = parseFloat(available.replace(/[,.]/g, ''));

  return requestAmount > availableAmount || requestAmount === 0;
};

const validateDeposit = (request) => {
  const requestAmount = Number(request.replace(/[,.]/g, '')) / 100;
  return requestAmount < 1000;
};

const requestIsValid = async (req, res, next) => {
  try {
    const { request, type } = req.body;
    const { id } = req.params;
    const regex = /^[\d,/.]+$/;
    const user = await User.findById(id);
    const { available } = user.datas;

    if (!request) {
      return res.status(422).json({ message: 'Informar o valor é necessário', error: true });
    }

    if (!type) {
      return res.status(422).json({ message: 'Informar o tipo de operação é necessário', error: true });
    }

    if (!(type === 'withdrawal' || type === 'deposit')) {
      return res.status(422).json({ message: 'Tipo de operação inválida', error: true });
    }

    if (type === 'withdrawal' && validateWithdrawal(request, available)) {
      return res.status(422).json({ message: 'O valor informado é maior do que o valor disponível para levantamento', error: true });
    }

    if (type === 'deposit' && validateDeposit(request)) {
      return res.status(422).json({ message: 'O valor informado é menor do que o valor mínimo de depósito', error: true });
    }

    if (!regex.test(request)) {
      return res.status(422).json({ message: 'O valor deve conter apenas números', error: true });
    }

    return next();
  } catch (err) {
    return res.status(500).json({ message: `Server error: ${err.message}'`, error: true });
  }
};

module.exports = {
  requestIsValid,
};
