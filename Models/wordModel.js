const mongoose = require("mongoose");
const { Schema } = mongoose;

// coneect to DB
mongoose
  .connect(process.env.DATABASE, {
    serverApi: { version: "1", strict: true, deprecationErrors: true },
  })
  .then((con) => {
    console.log(`DB Connected Succssfully`);
  });

const diacritics = new Schema({
  word_with_diacritics: String,
  phonetic_writing: String,
  pronounciation: String,
});

const morphological_info = new Schema({
  root: String,
  // word_class: String,
  morphological_form: String,
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
  index: Number,
});

const Word = new Schema({
  text: {
    type: String,
    required: true,
  },
  diacritics: [diacritics],
  morphological_info: morphological_info,
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

const WordModel = new mongoose.model("Word", Word);
module.exports = WordModel;
