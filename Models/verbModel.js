const mongoose = require("mongoose");
const { Schema } = mongoose;

const diacritics = new Schema({
  word_with_diacritics: String,
  // other_forms: [diacritics],
  phonetic_writing: String,
  pronounciation: String,
  derivational_forms: [String],
  morphological_balance: String,
  root: String,
  linguistic_level: String,
});

const collocate = new Schema({
  collocate_text: String,
  meaning: String,
  example: [
    {
      text: String,
      source: String,
    },
  ],
});

const meaning = new Schema({
  text: String,
  image: {
    url: String,
    description: String,
    source: String,
  },
  example: [
    {
      text: String,
      source: String,
    },
  ],
  translation: String,
});

const semantic_info = new Schema({
  semantic_fields: [String],
  meaning: meaning,
  collocates: [collocate],
  completed: {
    type: Boolean,
    default: false,
  },
  /* TODO make it Unique to prevent duplicate Index*/
  index: Number,
});

const Verb = new Schema({
  text: {
    type: String,
    required: true,
    unique: true,
  },
  diacritics: [diacritics],
  semantic_info: [semantic_info],
  state: {
    type: String,
    enum: {
      values: ["قيد التحرير", "قيد المراجعة"],
      message: "حالة البطاقة يجب ان تكون قيد التحرير او المراجعة",
    },
  },
  notes: String,
});

const VerbModel = new mongoose.model("Verb", Verb);
module.exports = VerbModel;
