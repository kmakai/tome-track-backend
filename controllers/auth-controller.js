const asyncHandler = require("express-async-handler");
// const { promisify } = require("util");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user-model");
const Book = require("../models/book-model");

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const createNewUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  let token = generateToken(user._id);
  res.cookie("jwt", token);

  res.status(201).json({
    status: "success",
    message: " User Created",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    },
  });
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).populate(
    "myBooks readBooks favoriteBooks readingNow myShelves"
  );

  const books = await Book.find();

  if (user && (await bcrypt.compare(password, user.password))) {
    let token = generateToken(user._id);
    res.cookie("jwt", token);

    res.status(200).json({
      status: "success",
      message: "User logged in",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        myBooks: books,
        readBooks: user.readBooks,
        favoriteBooks: user.favoriteBooks,
        readingNow: user.readingNow,
        myShelves: user.myShelves,
        token,
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

const isLoggedIn = asyncHandler(async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);

      const currentUser = await User.findById(decoded.id);

      if (!currentUser) {
        return next();
      }

      req.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
});

module.exports = { createNewUser, loginUser };
