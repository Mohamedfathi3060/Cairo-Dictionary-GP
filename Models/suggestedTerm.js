const mongoose = require('mongoose');

const suggestedTerm = new mongoose.Schema(
  {
    definition: {
      type: String,
      required: true,
    },
    term: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const suggestTermModel = new mongoose.model('SuggestedTerms', suggestedTerm);
module.exports = suggestTermModel;
