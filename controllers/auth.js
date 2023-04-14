const User = require("../modals/userModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(406).json({ message: "User already exists." });
      return;
    }

    // hash the password
    const saltRounds = 10;
    const salt = await bcrypt.genSaltSync(saltRounds);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    //console.log(hashedPassword);
    const user = await User({
      email,
      password: hashedPassword,

      firstName,
      lastName,
    });
    await user.save();
    res.status(201).json({ message: "user is created" });
    //console.log(req.body);
    console.log(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(406).json({ message: "credentials not found" });
      return;
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      res.status(406).json({ message: "credentials not found" });
      return;
    }

    // create jwt token
    const payload = {
      username: email,
      _id: user._id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    //const token = jwt.sign(payload, );
    console.log(token);
    res.json({ message: "succesfully logged in.", token, user });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
