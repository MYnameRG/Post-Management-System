const User = require("../models/user");

module.exports.getStatus = async (req, res, next) => {
  const id = req.params.userId;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Success!!", data: { status: user.status } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateStatus = async (req, res, next) => {
  const id = req.params.userId;
  const status = req.body.status;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    user.status = status;
    
    const updated_user = await user.save();

    res
      .status(200)
      .json({ message: "Success!!", data: updated_user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
