import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
const userSignUp = expressAsyncHandler(async (req, res) => {

  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword
  });

  res.status(201).json({
    status: "success",
    data: user
  });

});
const logIn = expressAsyncHandler(async (req, res) => {

  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Fill all the feilds");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw Error("User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    const token = jwt.sign({ email, _id: user._id, username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60m' });
    res.cookie("token", token);
    res.json({ "message": "Token generated", user,token })
  }
});
export { userSignUp, logIn };