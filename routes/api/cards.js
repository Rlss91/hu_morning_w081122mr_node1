const express = require("express");
const router = express.Router();
const cardsServiceModel = require("../../model/cards/cardsService");

router.post("/", async (req, res) => {
  try {
    //!joi validation
    const dataFromMongoose = await cardsServiceModel.createCard(req.body);
    console.log("dataFromMongoose", dataFromMongoose);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
