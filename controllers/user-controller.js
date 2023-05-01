const asyncHandler = require("express-async-handler");
const User = require("../models/user-model");
const Book = require("../models/book-model");

const getFavorites = asyncHandler(async (req, res) => {
  res.send("book handler");
});

const saveBook = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const book = await Book.create(req.body);

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
