const express = require("express");
const router = express.Router();
const cardsServiceModel = require("../../model/cards/cardsService");
const cardsValidationService = require("../../validation/cardsValidationService");

router.post("/", async (req, res) => {
  try {
    await cardsValidationService.createCardValidation(req.body);
    const dataFromMongoose = await cardsServiceModel.createCard(req.body);
    console.log("dataFromMongoose", dataFromMongoose);
    res.json({ msg: "ok" });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const allCards = await cardsServiceModel.getAllCards();
    res.json(allCards);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    //! joi validation
    const cardFromDB = await cardsServiceModel.getCardById(req.params.id);
    res.json(cardFromDB);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
