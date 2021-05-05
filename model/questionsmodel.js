const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionsSchema = new Schema({
  /* id: { required: true, type: Number }, */
  question: String,
  category_id: { type: Schema.Types.ObjectId, ref: "Category" },
  isMultiple: Boolean,
  answers: [
      {
    value: String,
    text: String,
    days: Number,
    cost: Number,
  }
  ],
});

module.exports = mongoose.model("Questions", QuestionsSchema);
