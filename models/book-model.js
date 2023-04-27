const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  bookTitle: { type: String, required: true },
  bookId: { type: String, required: true },
  bookUrl: { type: String, required: true },
  bookImg: { type: String, required: true },
});

module.exports = mongoose.model("Book", bookSchema);
