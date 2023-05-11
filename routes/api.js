const express = require("express");
const router = express.Router();

const authRouter = require("./api/auth");

// http://localhost:8181/api
// http://localhost:8181/api/
router.get("/", (req, res) => {
  res.json({ msg: "sub route" });
});

//http://localhost:8181/api/register
router.get("/register", (req, res) => {
  res.json({ msg: "register" });
});

//http://localhost:8181/api/auth/
router.use("/auth", authRouter);

module.exports = router;
