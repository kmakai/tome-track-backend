var express = require("express");
var router = express.Router();

router.use("/shelf", require("./shelf-routes"));
router.use("/books", require("./book-routes"));
router.use("/user", require("./user-routes"));

router.get("/", function (req, res, next) {
  res.send({ message: "Welcome to Tome-Track" });
});

module.exports = router;
