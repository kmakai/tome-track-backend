const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    volumeId: { $type: String, required: true },
    title: String,
    subtitle: String,
    authors: [String],
    publisher: String,
    publishedDate: String,
    description: String,
    industryIdentifiers: [
      {
        type: String,
        identifier: String,
      },
    ],
    pageCount: Number,
    dimensions: {
      height: String,
      width: String,
      thickness: String,
    },
    printType: String,
    mainCategory: String,
    categories: [String],
    averageRating: Number,
    ratingsCount: Number,
    contentVersion: String,
    imageLinks: {
      smallThumbnail: String,
      thumbnail: String,
      small: String,
      medium: String,
      large: String,
      extraLarge: String,
    },
    language: String,
    previewLink: String,
    infoLink: String,
    canonicalVolumeLink: String,
  },
  {
    typeKey: "$type",
  }
);

module.exports = mongoose.model("Book", bookSchema);
