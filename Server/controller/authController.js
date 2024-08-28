const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const config = require("../config");
const User = require("../model/User");

exports.Signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User is already exist!!!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashedPassword });

    await newUser.save();
    res.status(401).json(newUser);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = await User.findOne({ email });
    if (!users) {
      return res.status(400).json({ msg: "User not found: Signup First" });
    }

    const isMatch = await bcrypt.compare(password, users.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Check your password" });
    }

    const payload = { id: users.id, username: users.username };
    jwt.sign(payload, config.Key, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.status(200).json({ token });
    });
  } catch (err) {
    res.status(500).json({ msg: "Something went Wrong" });
  }
};
