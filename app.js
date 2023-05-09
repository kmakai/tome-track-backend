require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

const indexRouter = require("./routes/index");
const connectDB = require("./dbConfig/db");

const app = express();

connectDB();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(helmet());
app.use(compression());

app.use("/api/v1", indexRouter);

module.exports = app;
