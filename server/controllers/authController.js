import authService from "../services/authService.js";

export const userLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({
      message: "Username and password are required",
    });

  try {
    const response = await authService.userLogin(username, password);

    res.cookie("jwt", response.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ accessToken: response.accessToken });
  } catch (error) {
    res.status(error?.status || 500).json({ message: error.message });
  }
};
