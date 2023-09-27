const User = require("../schemas/user");

const getUserById = async (id) => {
  return User.findOne({ _id: id });
};

const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

const updateUserToken = async ({ id, token }) => {
  return User.findByIdAndUpdate({ _id: id }, { token: token });
};

const updateUserInfo = async ({ id, fields }) => {
  return User.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

module.exports = {
  getUserById,
  getUserByEmail,
  updateUserToken,
  updateUserInfo,
};
