const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  /* id: Number, */
  title: String,
});

module.exports = mongoose.model("Category", CategorySchema);