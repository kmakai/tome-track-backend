const asyncHandler = require("express-async-handler");
// const { promisify } = require("util");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user-model");
const Book = require("../models/book-model");
const BookShelf = require("../models/shelf-model");

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

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id).populate(
    "myBooks readBooks favoriteBooks readingNow myShelves"
  );

  if (!currentUser) {
    res.status(401);
    throw new Error("User not found");
  }

  req.user = currentUser;

  next();
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).populate(
    "myBooks readBooks favoriteBooks readingNow"
  );

  const myShelves = await BookShelf.find({ userId: user._id }).populate(
    "books"
  );

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
        myBooks: user.myBooks,
        readBooks: user.readBooks,
        favoriteBooks: user.favoriteBooks,
        readingNow: user.readingNow,
        myShelves,
      },
      token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

const loginGuest = asyncHandler(async (req, res, next) => {
  const emails = [
    "test@tometrack.com",
    "john@tometrack.com",
    "jane@tometrack.com",
    "jack@tometrack.com",
  ];
  const randomN = Math.floor(Math.random() * (3 - 0 + 1) + 0);

  req.body.email = emails[randomN];
  req.body.password = "pass1234";
  next();
});

module.exports = { createNewUser, loginUser, protect, loginGuest };
