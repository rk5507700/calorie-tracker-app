import jwt from "jsonwebtoken";
const generateToken = (user) => {
  const payload = {
    user: {
      id: user._id,
    },
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
  return token;
};
export default generateToken;
