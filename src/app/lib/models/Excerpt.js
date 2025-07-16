const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const excerptSchema = new Schema({
  bookName: String,
  content: String,
});
module.exports = Excerpt = mongoose.model("excerpt", excerptSchema);
