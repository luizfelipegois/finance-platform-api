const User = require('../models/auth');

const getInfoUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id, '-password');

    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ message: `Server error: ${err.message}`, error: true });
  }
};

module.exports = {
  getInfoUser,
};
