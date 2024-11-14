const express = require("express");
const router = express.Router();
const wordModel = require("../Models/wordModel");
const userModel = require("../Models/userModel");

const { checkAuth } = require("../controllers/checkAuth");

router.use(checkAuth);

router.get("/:ID", async (req, res) => {
  try {
    let word = await wordModel.findById(req.params.ID).exec();
    res.json({
      data: word,
    });
  } catch (err) {
    res.json({
      error: err,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const user = await userModel.findOne({ code: req.user }).populate({
      path: "words",
      select: "text",
      match: { state: "قيد التحرير" },
    });

    res.json({
      assigned_words: user.words,
      code: user.code,
      committee: user.committee,
      type: user.type,
      time_spent: user.time_spent,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const Word = await new wordModel(req.body);
    await Word.save();
    res.json({
      data: Word,
    });
  } catch (err) {
    res.json({
      error: err,
    });
  }
});

module.exports = router;
