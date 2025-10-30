import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
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

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User Not Found");
  }
  const isMatch = await bcrypt.compare(password, user?.password);
  if (!isMatch) {
    throw new Error("Invalid Credentials");
  }
  await user.save();
  res.json({
    status: "success",
    email: user?.email,
    _id: user?._id,
    username: user?.username,
    role: user?.role,
    token: generateToken(user),
  });
};
