import sharedService from "./sharedService.js";

const userHasRefreshToken = async (refreshToken) => {
  const validUser = await sharedService.findUserByRefreshToken(refreshToken);
  return validUser;
};

const deleteRefreshToken = async (userWithToken) => {
  userWithToken.userRefreshToken = "";
  await userWithToken.save();
};

export default {
  userHasRefreshToken,
  deleteRefreshToken,
};
