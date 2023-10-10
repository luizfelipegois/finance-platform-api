const User = require('../models/auth');

const getInfoUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id, '-password');

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: 'Erro de servidor. Tente mais tarde', error: true, errorMessage: error });
  }
};

module.exports = {
  getInfoUser,
};
