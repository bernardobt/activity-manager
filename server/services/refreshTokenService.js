import sharedService from "./sharedService.js";

const userRefreshToken = async (refreshToken) => {
  const validUser = await sharedService.findUserByRefreshToken(refreshToken);
  return validUser;
};

export default {
  userRefreshToken,
};
