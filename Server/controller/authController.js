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
      return res.status(400).json({ msg: "User is already found" });
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
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found: Signup First" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = { id: user._id }; 
    const token = jwt.sign(payload, config.jwtKey, { expiresIn: 3600 }); 

    res.status(200).json({ token, msg: "Login successful" }); 

  } catch (err) {
    res.status(500).json({ msg: "Something is Wrong" });
  }
};


// exports.Login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ msg: "User not found: Signup First" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     const payload = { id: User.id, username: User.username };
//     jwt.sign(payload, config.jwtKey, { expiresIn: 3600 }, (err, token) => {
//       if (err) throw err;
//       res.json({ token });
//     });

//   } catch (err) {
//     res.status(500).json({ msg: "Something is Wrong" });
//   }
// };
