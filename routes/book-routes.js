const express = require("express");
const router = express.Router();

const userController = require("../controllers/user-controller");
const authController = require("../controllers/auth-controller");
const bookController = require("../controllers/book-controller");

router.post("/save", authController.protect, bookController.saveBook);
router.patch("/delete", authController.protect, bookController.deleteBook);

router.post(
  "/favorite/add",
  authController.protect,
  bookController.addFavorite
);

router.patch(
  "/favorite/remove",
  authController.protect,
  bookController.removeFavorite
);

router.post("/read/add", authController.protect, bookController.addRead);
router.patch("/read/remove", authController.protect, bookController.removeRead);

router.post(
  "/reading/add",
  authController.protect,
  bookController.addReadingNow
);

router.patch(
  "/reading/remove",
  authController.protect,
  bookController.removeReadingNow
);

module.exports = router;
