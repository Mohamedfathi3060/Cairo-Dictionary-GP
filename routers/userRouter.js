const express = require("express");
const router = express.Router();
const userModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");

getToken = function (code) {
  const secret = process.env.JWT_SECRET_KEY;
  let token = jwt.sign(
    {
      code,
      //   committee,
      //   username,
      //   type,
    },
    secret,
    {
      expiresIn: "36h",
    }
  );
  return token;
};

router.post("/login", async (req, res) => {
  try {
    const { code, password } = req.body;
    if (!code || !password) {
      res.json({
        status: "error",
        message: "code and password is required to login...!",
      });
    }
    let user = await userModel.findOne({ code }).exec();

    if (!user) {
      res.json({
        status: "error",
        message: "اسم المستخدم او كلمة المرور غير صحيحة",
      });
    }
    // if (!user.comparePassword(password)) {
    if (password != user.password) {
      res.json({
        status: "error",
        message: "اسم المستخدم او كلمة المرور غير صحيحة",
      });
    }
    await user.populate("words", "text").execPopulate();

    let token = getToken(code);

    res.json({
      token,
      assigned_words: user.words,
      code: user.code,
      committee: user.committee,
    });
  } catch (error) {
    res.json(err);
  }
});

module.exports = router;
