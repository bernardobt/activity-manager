import jwt from "jsonwebtoken";

import userRefreshToken from "../services/refreshTokenService.js";

export const refreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const validUser = await userRefreshToken.userRefreshToken(refreshToken);
  if (!validUser) res.sendStatus(403);

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (error, decoded) => {
      if (error || validUser.username !== decoded.username)
        throw {
          status: 403,
          message: "Fobidden",
        };
      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: decoded.username,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10m" }
      );
      res.json({ accessToken: accessToken });
    }
  );
};
