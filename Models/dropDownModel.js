const mongoose = require("mongoose");
const { Schema } = mongoose;

const dropDown = new Schema({
  name: {
    type: String,
    required: true,
  },
  choices: [String],
});

// GET ALL DROPDOWNS WITH THEIR CHOICES "3 types"
// POST choice to dropdown
const dropDownModel = new mongoose.model("dropDown", dropDown);

module.exports = dropDownModel;
