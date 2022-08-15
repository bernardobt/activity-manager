import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const User = mongoose.model("users", userSchema);

export default User;
