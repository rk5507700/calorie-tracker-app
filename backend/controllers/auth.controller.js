import User from "../models/User.model.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const { username, password, email } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    throw new Error("User Already Existing");
  }
  const newUser = new User({ username, email, password });
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(password, salt);
  await newUser.save();
  res.json({
    status: "success",
    message: "User registered successfully",
    _id: newUser?.id,
    username: newUser?.username,
    email: newUser?.email,
  });
};
