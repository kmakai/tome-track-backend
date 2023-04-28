const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// {
//   bookTitle: { type: String, required: true },
//   bookId: { type: String, required: true },
//   bookUrl: { type: String, required: true },
//   bookImg: { type: String, required: true },
// }
const bookSchema = new Schema({
  volumeId: { type: String, required: true },
  title: string,
  subtitle: string,
  authors: [string],
  publisher: string,
  publishedDate: string,
  description: string,
  industryIdentifiers: [
    {
      type: string,
      identifier: string,
    },
  ],
  pageCount: integer,
  dimensions: {
    height: string,
    width: string,
    thickness: string,
  },
  printType: string,
  mainCategory: string,
  categories: [string],
  averageRating: double,
  ratingsCount: integer,
  contentVersion: string,
  imageLinks: {
    smallThumbnail: string,
    thumbnail: string,
    small: string,
    medium: string,
    large: string,
    extraLarge: string,
  },
  language: string,
  previewLink: string,
  infoLink: string,
  canonicalVolumeLink: string,
});

module.exports = mongoose.model("Book", bookSchema);
