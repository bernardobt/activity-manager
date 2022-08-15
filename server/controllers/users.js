import mongoose from "mongoose";

/* import db user model */
import User from "../models/user.js";

/* gets list of all registered users */
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/* adds a new user
have to make it check if username and/or email 
are already in use or not
*/
export const addUser = async (req, res) => {
  const user = req.body;
  const newUsers = new User(user);
  try {
    // console.log("start");
    await newUsers.save();
    res.status(201).json(newUsers);
    // console.log("end");
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

/* updates user information */
export const updateUser = async (req, res) => {
  const { id: _id } = req.params;
  const user = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Could not find user. Non existent id.");
  const updatedUser = await User.findByIdAndUpdate(_id, user, {
    new: true,
  });
  res.json(updatedUser);
};

/* deletes user from db */
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Could not find user. Non existent id.");
  await User.findByIdAndRemove(id);
  res.json({ message: "User sucessfully deleted from database" });
};
