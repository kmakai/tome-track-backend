const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  bookId: { type: String, required: true },
  bookUrl: { type: String, required: true },
  bookImg: { type: String, required: true },
});

module.exports = mongoose.model("Book", bookSchema);
