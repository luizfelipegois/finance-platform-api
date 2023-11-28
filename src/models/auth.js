const mongoose = require('mongoose');

const User = mongoose.model('Users', {
  _id: String,
  name: String,
  email: String,
  password: String,
  phone: String,
  datas: Object,
  requests: Array,
});

module.exports = User;
