const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth-controller");
const userController = require("../controllers/user-controller");

router.post("/register", authController.createNewUser);
router.post("/login", authController.loginUser);

router.get("/:id", userController.getUserById);

// Favorites
router
  .route("/:id/favorites")
  .get(userController.getFavorites)
  .post(userController.addFavorite);

router.post(":id/favorites/:bookId/remove", userController.removeFavorite);
/*
// Read Books
router
  .route("/:id/read-books")
  .get(userController.getReadBooks)
  .post(userController.addReadBook);

router.post(":id/read-books/:bookId/remove", userController.removeFavorite);

// Reading Books
router
  .route("/:id/my-books")
  .get(userController.getMyBooks)
  .post(userController.addToMyBooks);

router.post(":id/my-books/:bookId/remove", userController.removeFromMyBooks);

// To Read Books
router
  .route("/:id/to-read-books")
  .get(userController.getToReadBooks)
  .post(userController.addToReadBook);

router.post(
  ":id/to-read-books/:bookId/remove",
  userController.removeToReadBook
);
*/
module.exports = router;
