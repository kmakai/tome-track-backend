const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: [true, "Your full name is required"] },
  email: { type: String, required: [true, "Your email is required"] },
  password: { type: String, required: [true, "Your password is required"] },
  favoriteBooks: [{ type: String }],
  readBooks: [{ type: String }],
  toReadBooks: [{ type: String }],
  myBooks: [{ type: String }],
  myShelves: [{ type: Schema.Types.ObjectId, ref: "BookShelf" }],
});

module.exports = mongoose.model("User", userSchema);
