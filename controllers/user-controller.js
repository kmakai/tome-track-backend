const asyncHandler = require("express-async-handler");
const User = require("../models/user-model");
const Book = require("../models/book-model");

const getFavorites = asyncHandler(async (req, res) => {
  res.send("book handler");
});

const saveBook = asyncHandler(async (req, res, next) => {
  console.log(req.body);

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

const getUserById = asyncHandler(async (req, res) => {
  res.send("book handler");
});

const addFavorite = asyncHandler(async (req, res) => {
  res.send("book handler");
});

const removeFavorite = asyncHandler(async (req, res) => {
  res.send("book handler");
});

module.exports = {
  saveBook,
  getUserById,
  getFavorites,
  addFavorite,
  removeFavorite,
};
