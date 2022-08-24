import User from "../models/userModel.js";

const emailExists = async (email) => {
  const alreadyExists = (await User.findOne({ email: email }).exec())
    ? true
    : false;
  return alreadyExists;
};

const usernameExists = async (username) => {
  const alreadyExists = (await User.findOne({ username: username }).exec())
    ? true
    : false;
  return alreadyExists;
};

const findUserByUsername = async (username) => {
  const foundUser = await User.findOne({ username: username }).exec();
  return foundUser;
};

const findUserByRefreshToken = async (refreshToken) => {
  const foundUser = await User.findOne({
    userRefreshToken: refreshToken,
  }).exec();
  return foundUser;
};

export default {
  emailExists,
  usernameExists,
  findUserByUsername,
  findUserByRefreshToken,
};
