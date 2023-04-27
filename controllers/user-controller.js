const asyncHandler = require("express-async-handler");
const User = require("../models/user-model");
const Book = require("../models/book-model");

const getFavorites = asyncHandler(async (req, res) => {
  res.send("book handler");
});

const createBook = asyncHandler(async (req, res, next) => {
  res.send("book handler");
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

module.exports = { getUserById, getFavorites, addFavorite, removeFavorite };
