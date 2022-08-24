import User from "../models/userModel.js";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const signInUser = async (userToSingIn) => {
  const userExists = await User.findOne({
    username: userToSingIn.username,
  }).exec();
  if (!userExists)
    throw {
      status: 401,
    };

  if (userToSingIn.password === userExists.password) {
    const accessToken = jwt.sign(
      { username: userExists.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );
    const refreshToken = jwt.sign(
      { username: userExists.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // const otherUsers =
    // const currentUser = { ...userExists, refreshToken }

    return { success: `Logged in as ${userToSingIn.username}` };
  } else
    throw {
      status: 401,
    };
};

export default {
  signInUser,
};
