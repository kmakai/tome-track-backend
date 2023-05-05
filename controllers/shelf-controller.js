const asyncHandler = require("express-async-handler");

const example = asyncHandler(async (req, res, next) => {
  res.status(200).json({ status: "success", message: " User updated" });
});

const BookShelf = require("../models/shelf-model");
const Book = require("../models/book-model");

const createBookShelf = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const user = req.user;

  const bookShelf = await BookShelf.create({
    name,
    user: user._id,
    description: req.body.description || "",
  });

  if (!bookShelf) {
    res.status(400);
    throw new Error("Book shelf not created");
  }

  user.myShelves.push(bookShelf._id);

  user.save();

  res.status(201).json({ message: "Book shelf created", bookShelf });
});

const getBookShelf = asyncHandler(async (req, res, next) => {
  const bookShelf = await BookShelf.findById(req.params.id);

  if (!bookShelf) {
    res.status(400);
    throw new Error("Book shelf not found");
  }

  res.status(200).json({ message: "Book shelf found", bookShelf });
});

const addToBookShelf = asyncHandler(async (req, res, next) => {
  const bookId = req.body;
  const bookShelf = await BookShelf.findById(req.params.id);
  const book = await Book.findById(bookId);

  if (!bookShelf || !book) {
    res.status(400);
    throw new Error("Something went wrong");
  }

  bookShelf.books.push(bookId);

  bookShelf.save();

  res.status(200).json({ message: "Book added to book shelf", bookShelf });
});

const removeFromBookShelf = asyncHandler(async (req, res, next) => {
  const bookId = req.body;

  const bookShelf = await BookShelf.findById(req.params.id);

  if (!bookShelf) {
    res.status(400);
    throw new Error("Book shelf not found");
  }

  bookShelf.books = bookShelf.books.filter(
    (book) => book.toString() !== bookId
  );

  bookShelf.save();

  res.status(200).json({ message: "Book removed from book shelf", bookShelf });
});

const deleteBookShelf = asyncHandler(async (req, res, next) => {
  const bookShelf = await BookShelf.findById(req.params.id);

  if (!bookShelf) {
    res.status(400);
    throw new Error("Book shelf not found");
  }

  bookShelf.remove();

  res.status(200).json({ message: "Book shelf deleted" });
});

module.exports = {
  createBookShelf,
  getBookShelf,
  addToBookShelf,
  removeFromBookShelf,
  deleteBookShelf,
};
