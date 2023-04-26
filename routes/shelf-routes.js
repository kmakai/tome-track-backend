const express = require("express");
const router = express.Router();

const shelfController = require("../controllers/shelf-controller");

router.post("/create", shelfController.createBookShelf);
router.get("/:shelfId", shelfController.getBookShelf);
router.post("/:shelfId/add", shelfController.addToBookShelf);
router.post("/:shelfId/remove", shelfController.removeFromBookShelf);
router.post("/:shelfId/delete", shelfController.deleteBookShelf);

module.exports = router;
