const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: [true, "Your full name is required"] },
  email: { type: String, required: [true, "Your email is required"] },
  password: { type: String, required: [true, "Your password is required"] },
  favoriteBooks: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  readBooks: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  readingNow: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  myBooks: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  myShelves: [{ type: Schema.Types.ObjectId, ref: "BookShelf" }],
});

module.exports = mongoose.model("User", userSchema);
