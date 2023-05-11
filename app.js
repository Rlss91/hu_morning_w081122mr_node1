const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const apiRouter = require("./routes/api");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
app.use("/admin", express.static(path.join(__dirname, "admin")));
// app.use("/biz", express.static(path.join(__dirname, "biz")));
// app.use("/regular", express.static(path.join(__dirname, "regular")));

app.use("/api", apiRouter);
app.use((req, res, next) => {
  res.status(404).json({ err: "page not found" });
});

module.exports = app;
