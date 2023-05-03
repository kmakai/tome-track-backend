const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth-controller");
const userController = require("../controllers/user-controller");

router.post("/register", authController.createNewUser);
router.post("/login", authController.loginUser);
router.get("/refresh", authController.protect, userController.userRefresh);
router.get("/:id", userController.getUserById);

module.exports = router;
