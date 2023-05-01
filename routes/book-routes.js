const express = require("express");
const router = express.Router();

const userController = require("../controllers/user-controller");

router.post("/save", userController.saveBook);

module.exports = router;
