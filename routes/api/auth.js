const express = require("express");
const router = express.Router();
const bcrypt = require("../../config/bcrypt");
const {
  registerUserValidation,
  loginUserValidation,
} = require("../../validation/authValidationService");
const normalizeUser = require("../../model/users/helpers/normalizationUser");
const usersServiceModel = require("../../model/users/usersService");
const { generateToken } = require("../../config/jwt");
const CustomError = require("../../utils/CustomError");

//http://localhost:8181/api/auth/register
router.post("/register", async (req, res) => {
  try {
    /*
     * joi
     * email unique - mongoose -> mongo
     * encrypt the password
     * normalize
     * create user
     * response user created
     */
    await registerUserValidation(req.body);
    req.body.password = await bcrypt.generateHash(req.body.password);
    req.body = normalizeUser(req.body);
    await usersServiceModel.registerUser(req.body);
    res.json({ msg: "register" });
  } catch (err) {
    res.status(400).json(err);
  }
});

//http://localhost:8181/api/auth/login
router.post("/login", async (req, res) => {
  try {
    /**
     * *joi
     * *get user from database
     * *check password
     * *create token
     * *send to user
     */
    await loginUserValidation(req.body);
    const userData = await usersServiceModel.getUserByEmail(req.body.email);
    if (!userData) throw new CustomError("invalid email and/or password");
    const isPasswordMatch = await bcrypt.cmpHash(
      req.body.password,
      userData.password
    );
    if (!isPasswordMatch)
      throw new CustomError("invalid email and/or password");
    const token = await generateToken({
      _id: userData._id,
      isAdmin: userData.isAdmin,
      isBusiness: userData.isBusiness,
    });
    res.json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
