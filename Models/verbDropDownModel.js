const mongoose = require("mongoose");
const { Schema } = mongoose;

const verbDropDown = new Schema({

  name: {
    type: String,
    required: true,
  },
  choices: [String],
});
    
// POST choice to dropdown
const VerbDropDownModel = new mongoose.model("verbDropDown", verbDropDown);

module.exports = VerbDropDownModel;


