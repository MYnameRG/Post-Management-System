const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports.postLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (isEqual) {
      const token = jwt.sign(
        {
          id: user._id.toString(),
          email: email,
        },
        "secret",
        { expiresIn: "1h" }
      );
      return res.status(200).json({ token: token, data: user, message: "Success!!!" });
    }

    res.status(200).json({ message: "Incorrect Password" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports.postSignUp = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  try {
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 12);
    user = new User({
      name: name,
      email: email,
      password: hashed,
      status: "I am new",
    });
    await user.save();

    res.status(200).json({ data: user, message: "SuccessFully Stored!!!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
