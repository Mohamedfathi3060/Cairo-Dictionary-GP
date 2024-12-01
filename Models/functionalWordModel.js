const mongoose = require("mongoose");
const { Schema } = mongoose;

//الكلمات التوظيفية

// mongoose.connect(process.env.DATABASE, {
//     serverApi: { version: "1", strict: true, deprecationErrors: true },
//   })
//   .then((con) => {
//     console.log(`DB Connected Successfully`);
//   });

// mongoose.connect("mongodb://localhost:27017/testDB", {
//   serverApi: { version: "1", strict: true, deprecationErrors: true },
// })
// .then(() => {
//   console.log(`DB Connected Successfully`);
// })
// .catch((err) => {
//   console.error("Failed to connect to MongoDB:", err);
// });

// التشكيل والنطق الصوتي
const diacritics = new Schema({
  word_with_diacritics: String,
  phonetic_writing: String,
  pronunciation: String,
});

//الوظيفة اللغوية
const linguistic_function = new Schema({
  example: [
    {
      text: String,
      source: String,
    },
  ],
});

//الدلالة السياقية
const contextual_indicators = new Schema({
  example: [
    {
      text: String,
      source: String,
    },
  ],
});

//التصاحب التركيبي
const syntactic_collocation = new Schema({
  example: [
    {
      text: String,
      source: String,
    },
  ],
});

const functionalWord = new Schema({
  text: String,
  diacritics: [diacritics],
  linguistic_function: linguistic_function,
  contextual_indicators: contextual_indicators,
  syntactic_collocation: syntactic_collocation,
  state: {
    type: String,
    enum: {
      values: ["قيد التحرير", "قيد المراجعة"],
      message: "حالة البطاقة يجب ان تكون قيد التحرير او المراجعة",
    },
    required: true,
  },
  notes: String,
});

const FunctionalWordModel = new mongoose.model(
  "FunctionalWord",
  functionalWord
);
module.exports = FunctionalWordModel;
