import users from "../dal/users.js";

const getUsers = async () => {
  try {
    const allUsers = await users.getUsers();
    return allUsers;
  } catch (error) {
    throw error;
  }
};

const getUser = async (userId) => {
  try {
    const user = await users.getUser(userId);
    return user;
  } catch (error) {
    throw error;
  }
};

const addUser = async (userObject) => {
  try {
    const createdUser = await users.addUser(userObject);
    return createdUser;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    const deletedUser = await users.deleteUser(userId);
    return deletedUser;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (userId, userObject) => {
  try {
    const updatedUser = await users.updateUser(userId, userObject);
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const signInUser = async (userId, userObject, res) => {
  try {
    const signedUser = await users.signInUser(userId, userObject, res);
    return signedUser;
  } catch (error) {
    throw error;
  }
};

export default {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  signInUser,
};
