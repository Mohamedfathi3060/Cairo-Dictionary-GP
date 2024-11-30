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


/* TODO
    1- Add verb_morphological_balance (الميزان الصرفي) drop down to the DB 
    فَعَل
    فعُل
    فَعل
    أَفَعَلَ
    انفَعَلَ
    تفاَعل
    تفعَّل 
    استَفْعل
    فَعَّلَ

    2- Add verb_linguistic_level (المستوي اللغوي) drop down to the DB 

    تراثي 
    معاصر
    دخيل 
    معرب
    منحوت
    */
