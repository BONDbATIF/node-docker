const User = require("../models/usersModel");

const bcrypt = require("bcryptjs");

exports.signUp = async (req, res, next) => {
  const { username, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 12);
  try {
    const newUser = await User.create({
      username,
      password: hashPassword,
    });
    req.session.user = newUser;
    res.status(201).json({
      status: "sucess",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "faild",
    });
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found.",
      });
    }

    const isCorrect = await bcrypt.compare(password, user.password);

    if (isCorrect) {
      req.session.user = user;
      res.status(200).json({
        status: "success",
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "incorrect username or password",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "faild",
    });
  }
};
