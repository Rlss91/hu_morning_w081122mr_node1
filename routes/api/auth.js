const express = require("express");
const router = express.Router();

//http://localhost:8181/api/auth/register
router.post("/register", async (req, res) => {
  try {
    /*
     * joi
     * email unique
     * encrypt the password
     * normalize
     * create user
     * response user created
     */
    // res.json({ msg: "register" });
  } catch (err) {
    res.status(400).json(err);
  }
});

//http://localhost:8181/api/auth/login
router.post("/login", (req, res) => {
  res.json({ msg: "login" });
});

module.exports = router;
