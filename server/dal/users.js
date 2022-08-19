import User from "../models/userModel.js";

const getUsers = async () => {
  try {
    const users = await User.find().exec();
    return users;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const addUser = async (userToAdd) => {
  // check if user exists
  const emailAlreadyExists = (await User.findOne({
    email: userToAdd.email,
  }).exec())
    ? true
    : false;
  const usernameAlreadyExists = (await User.findOne({
    username: userToAdd.username,
  }).exec())
    ? true
    : false;

  if (emailAlreadyExists || usernameAlreadyExists)
    throw {
      status: 409,
      mesage: "Email or Username already taken.",
    };

  try {
    const newUser = await new User(userToAdd);
    await newUser.save();
    return newUser;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const getUser = async (userId) => {
  try {
    const user = await User.findById(userId).exec();
    if (!user) {
      throw {
        status: 404,
        message: "Can't find user with the id",
      };
    }
    return user;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const deleteUser = async (userId) => {
  /* Maybe make it so it also deletes all content that awas created by that user */
  try {
    const deletedUser = await User.findByIdAndDelete(userId).exec();
    if (!deletedUser) {
      throw {
        status: 404,
        message: "Can't find user with the id",
      };
    }
    return deletedUser;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const updateUser = async (userId, userObject) => {
  /* maybe make it update all user's content info if username is changed */
  try {
    // check if user exists
    const emailAlreadyExists = (await User.findOne({
      email: userObject.email,
    }).exec())
      ? true
      : false;
    const usernameAlreadyExists = (await User.findOne({
      username: userObject.username,
    }).exec())
      ? true
      : false;

    if (emailAlreadyExists || usernameAlreadyExists)
      throw {
        status: 409,
        mesage: "Email or Username already taken.",
      };

    const updatedUser = await User.findByIdAndUpdate(userId, userObject, {
      new: true,
    });
    if (!updatedUser) {
      throw {
        status: 404,
        message: "Can't find user with the id",
      };
    }
    return updatedUser;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

export default { getUsers, addUser, getUser, deleteUser, updateUser };
