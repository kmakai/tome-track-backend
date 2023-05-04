const asyncHandler = require("express-async-handler");
const Book = require("../models/book-model");

const saveBook = asyncHandler(async (req, res, next) => {
  let book;
  book = await Book.findOne({ title: req.body.title });
  if (!book) book = await Book.create(req.body);

  if (!book) {
    res.status(400);
    throw new Error("Book not created");
  }

  const user = req.user;

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  user.myBooks.push(book._id);

  await user.save();
  res.status(200).json({ message: "success", book });
});

const deleteBook = asyncHandler(async (req, res, next) => {
  const { id } = req.body;

  const user = req.user;

  user.myBooks = user.myBooks.filter((book) => book.id !== id);

  await user.save();

  res.status(200).json({ message: "Book deleted" });
});

// Favorites
const addFavorite = asyncHandler(async (req, res) => {
  const user = req.user;

  const book = await Book.findOne({ volumeId: req.body.volumeId });

  if (!book) {
    res.status(400);
    throw new Error("Book not found");
  }

  user.favoriteBooks.push(book._id);

  await user.save();

  res.status(200).json({ message: "book saved to favorites" });
});

const removeFavorite = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const user = req.user;

  user.favoriteBooks = user.favoriteBooks.filter((book) => book.id !== id);

  await user.save();

  res.status(200).json({ message: "Book removed from favorites" });
});

// Reading Books
const addReadingNow = asyncHandler(async (req, res) => {
  const user = req.user;

  const book = await Book.findOne({ volumeId: req.body.volumeId });

  user.readingNow.push(book._id);
  await user.save();

  res.status(200).json({ message: "Book saved to reading now" });
});

const removeReadingNow = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const user = req.user;

  user.readingNow = user.readingNow.filter((book) => book.id !== id);

  await user.save();

  res.status(200).json({ message: "Book removed from reading now" });
});

// Read
const addRead = asyncHandler(async (req, res) => {
  const user = req.user;

  const book = await Book.findOne({ volumeId: req.body.volumeId });

  user.readBooks.push(book._id);
  await user.save();

  res.status(200).json({ message: "Book saved to read" });
});

const removeRead = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const user = req.user;

  user.readBooks = user.readBooks.filter((book) => book.id !== id);

  await user.save();

  res.status(200).json({ message: "Book removed from read" });
});

module.exports = {
  saveBook,
  deleteBook,
  addFavorite,
  removeFavorite,
  addReadingNow,
  removeReadingNow,
  addRead,
  removeRead,
};
