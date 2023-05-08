const asyncHandler = require("express-async-handler");
const User = require("../models/user-model");
const Book = require("../models/book-model");

const userRefresh = asyncHandler(async (req, res) => {
  if (req.user) {
    res.status(200).json({
      user: req.user,
    });
  }
});

module.exports = {
  userRefresh,
};
