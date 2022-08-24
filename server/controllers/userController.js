import userService from "../services/userService.js";

export const getUsers = async (req, res) => {
  try {
    const allUsers = await userService.getUsers();
    res.send({ status: "OK", data: allUsers });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const addUser = async (req, res) => {
  const { body } = req;
  try {
    const newUser = await userService.addUser(body);
    res.status(201).send({ status: "OK", data: newUser });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const getUser = async (req, res) => {
  const { params } = req;
  try {
    const user = await userService.getUser(params.id);
    res.send({ status: "OK", data: user });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const deleteUser = async (req, res) => {
  const { params } = req;
  try {
    const deletedUser = await userService.deleteUser(params.id);
    res.send({ status: "OK", data: deletedUser });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const updateUser = async (req, res) => {
  const { body, params } = req;
  try {
    const updatedUser = await userService.updateUser(params.id, body);
    res.status(201).send({ status: "OK", data: updatedUser });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const signInUser = async (req, res) => {
  const { body, params } = req;
  try {
    const signingInUser = await userService.signInUser(params.id, body, res);
    res.status(201).send({ status: "OK", data: signingInUser });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};
