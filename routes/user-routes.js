const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth-controller");
const userController = require("../controllers/user-controller");
const bookController = require("../controllers/book-controller");

router.post("/register", authController.createNewUser);
router.post("/login", authController.loginUser);
router.get("/refresh", authController.protect, userController.userRefresh);
router.get("/myBooks", authController.protect, bookController.getMyBooks);
router.get("/readBooks", authController.protect, bookController.getReadBooks);
router.get("/readingNow", authController.protect, bookController.getReadingNow);

router.get(
  "/myFavorites",
  authController.protect,
  bookController.getMyFavorites
);

module.exports = router;
