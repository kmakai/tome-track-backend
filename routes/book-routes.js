const express = require("express");
const router = express.Router();

const userController = require("../controllers/user-controller");
const authController = require("../controllers/auth-controller");
const bookController = require("../controllers/book-controller");

router.post("/save", authController.protect, bookController.saveBook);
router.post(
  "/favorite/add",
  authController.protect,
  bookController.addFavorite
);

router.post("/read/add", authController.protect, bookController.addRead);

router.post(
  "/reading/add",
  authController.protect,
  bookController.addReadingNow
);

module.exports = router;
