import User from "../models/userModel.js";
import sharedService from "./sharedService.js";

const registerUser = async (email, username, password) => {
  const invalidEmail = await sharedService.emailExists(email);
  const invalidUsername = await sharedService.usernameExists(username);
  if (invalidEmail || invalidUsername)
    throw {
      status: 409,
      message: "Email or Username already taken.",
    };

  try {
    // will hash the password in the future
    const hashedPassword = password;

    const result = await User.create({
      email: email,
      username: username,
      password: hashedPassword,
    });
    return result;
  } catch (error) {
    return { status: 500, message: error?.message || error };
  }
};

export default {
  registerUser,
};
