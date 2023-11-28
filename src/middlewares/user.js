const User = require('../models/auth');

const requestIsValid = async (req, res, next) => {
  try {
    const { request } = req.body;
    const { id } = req.params;
    const regex = /^[\d,/.]+$/;
    const user = await User.findById(id);
    const { available } = user.datas;

    if (!request) return res.status(422).json({ message: 'Informar o valor é necessário', error: true });
    if (parseFloat(request.replace(/[,.]/g, '')) > parseFloat(available.replace(/[,.]/g, '')) || parseFloat(request.replace(/[,.]/g, '')) === 0) return res.status(422).json({ message: 'O valor informado é maior do que o valor disponível para levantamento', error: true });
    if (!regex.test(request)) return res.status(422).json({ message: 'O valor deve conter apenas números', error: true });

    return next();
  } catch (err) {
    return res.status(500).json({ message: `Server error: ${err.message}'`, error: true });
  }
};

module.exports = {
  requestIsValid,
};
