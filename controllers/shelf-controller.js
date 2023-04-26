const asyncHandler = require("express-async-handler");

const example = asyncHandler(async (req, res, next) => {
  res.status(200).json({ status: "success", message: " User updated" });
});

const BookShelf = require("../models/shelf-model");

const createBookShelf = asyncHandler(async (req, res, next) => {
  res.send("create book shelf");
});

const getBookShelf = asyncHandler(async (req, res, next) => {
  res.send("get book shelf");
});

const addToBookShelf = asyncHandler(async (req, res, next) => {
  res.send("add to  book shelf");
});

const removeFromBookShelf = asyncHandler(async (req, res, next) => {
  res.send("remove from  book shelf");
});

const deleteBookShelf = asyncHandler(async (req, res, next) => {
  res.send("delete book shelf");
});

module.exports = {
  createBookShelf,
  getBookShelf,
  addToBookShelf,
  removeFromBookShelf,
  deleteBookShelf,
};
