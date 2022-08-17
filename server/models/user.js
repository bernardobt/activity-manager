import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: String,
  username: String,
  password: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const User = mongoose.model("users", userSchema);

export default User;
