import sharedService from "./sharedService.js";

import jwt from "jsonwebtoken";

const userLogin = async (username, password) => {
  const validUser = await sharedService.findUserByUsername(username);
  if (!validUser) {
    throw {
      status: 401,
      message: "Unauthorized",
    };
  }
  const passwordMatch = password === validUser.password;
  if (!passwordMatch) {
    throw {
      status: 401,
      message: "Unauthorized",
    };
  }
  //create JWT
  const accessToken = jwt.sign(
    { username: validUser.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10m" }
  );
  const refreshToken = jwt.sign(
    { username: validUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  // save refreshtoken with current user
  validUser.userRefreshToken = refreshToken;
  await validUser.save();
  const response = {
    refreshToken: refreshToken,
    accessToken: accessToken,
  };

  return response;
};

export default {
  userLogin,
};
