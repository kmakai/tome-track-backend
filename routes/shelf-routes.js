const express = require("express");
const router = express.Router();

const shelfController = require("../controllers/shelf-controller");
const authController = require("../controllers/auth-controller");

router.post("/create", authController.protect, shelfController.createBookShelf);
router.get("/:id", shelfController.getBookShelf);
router.post("/:id/add", shelfController.addToBookShelf);
router.post("/:id/remove", shelfController.removeFromBookShelf);
router.post("/:id/delete", shelfController.deleteBookShelf);

module.exports = router;
