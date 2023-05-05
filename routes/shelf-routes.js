const express = require("express");
const router = express.Router();

const shelfController = require("../controllers/shelf-controller");
const authController = require("../controllers/auth-controller");

router.get("/getAll", authController.protect, shelfController.getBookShelves);
router.post("/create", authController.protect, shelfController.createBookShelf);
// router.get("/:id", authController.protect, shelfController.getBookShelf);
router.post("/:id/add", authController.protect, shelfController.addToBookShelf);
router.post(
  "/:id/remove",
  authController.protect,
  shelfController.removeFromBookShelf
);
router.post(
  "/:id/delete",
  authController.protect,
  shelfController.deleteBookShelf
);

module.exports = router;
