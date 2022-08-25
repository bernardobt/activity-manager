import registerService from "../services/registerService.js";

export const registerUser = async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password)
    return res.status(400).json({
      message: "Email, username and password are required for registering",
    });
  try {
    await registerService.registerUser(email, username, password);

    // res.sendStatus(201);
    res.status(201).json({ success: `New user ${username} created!` });
  } catch (error) {
    res.status(error?.status || 500).json({ message: error });
  }
};
