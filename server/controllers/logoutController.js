import userRefreshToken from "../services/refreshTokenService.js";
import logoutService from "../services/logoutService.js";

export const logoutUser = async (req, res) => {
  // on client also delet access token

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  // check for refresh token in db
  const validUser = await userRefreshToken.userRefreshToken(refreshToken);
  if (!validUser) {
    res.clearCookie("jwt", { httpOnly: true, secure: false, sameSite: "None" });
    return res.sendStatus(204);
  }

  // delete token from db
  await logoutService.deleteRefreshToken(validUser);

  res.clearCookie("jwt", { httpOnly: true }); // on development secure: false, but should be true otherwise
  res.sendStatus(204);
};
