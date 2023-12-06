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

const registerNewRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { request, type } = req.body;
    const user = await User.findById(id);
    const { requests } = user;

    const array = requests;
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    array.push({
      id: array.length,
      value: request,
      status: 'pending',
      date: `${day}/${month}/${year}`,
      type,
    });

    user.requests = array;

    await user.save();

    return res.status(200).json({ message: 'Requisição recebida com sucesso', error: false });
  } catch (err) {
    return res.status(500).json({ message: `Server error: ${err.message}`, error: true });
  }
};

module.exports = {
  getInfoUser,
  registerNewRequest,
};
