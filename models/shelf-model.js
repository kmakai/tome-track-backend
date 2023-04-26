const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shelfSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter a name for your shelf"],
  },
  books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("BookShelf", shelfSchema);
