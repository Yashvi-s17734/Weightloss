const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.signup = async (req, res) => {
  const { email, password } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (password.length < 6)
    return res
      .status(400)
      .json({ message: "Password must be atleast 6 characters" });
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser)
    return res.status(409).json({ message: "User already exists" });
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    password: hashedPassword,
  });
  const token = jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" },
  );
  res.status(201).json({ token });
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid Credentials" });
  const token = jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1d",
    },
  );
  res.json({ token });
};
