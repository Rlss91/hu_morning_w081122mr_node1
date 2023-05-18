const express = require("express");
const router = express.Router();
const cardsServiceModel = require("../../model/cards/cardsService");
const cardsValidationService = require("../../validation/cardsValidationService");
const normalizeCard = require("../../model/cards/helpers/normalizationCard");
const authmw = require("../../middleware/authMiddleware");

// biz only
router.post("/", authmw, async (req, res) => {
  try {
    await cardsValidationService.createCardValidation(req.body);
    let normalCard = await normalizeCard(req.body, "6460db599d17caea8cecb4d0");
    const dataFromMongoose = await cardsServiceModel.createCard(normalCard);
    console.log("dataFromMongoose", dataFromMongoose);
    res.json({ msg: "ok" });
  } catch (err) {
    res.status(400).json(err);
  }
});

// all
router.get("/", async (req, res) => {
  try {
    const allCards = await cardsServiceModel.getAllCards();
    res.json(allCards);
  } catch (err) {
    res.status(400).json(err);
  }
});

// all
router.get("/:id", async (req, res) => {
  try {
    //! joi validation
    const cardFromDB = await cardsServiceModel.getCardById(req.params.id);
    res.json(cardFromDB);
  } catch (err) {
    res.status(400).json(err);
  }
});

// specific biz or admin
router.put("/:id", async (req, res) => {
  try {
    //! joi validation
    //! normalize
    const cardFromDB = await cardsServiceModel.updateCard(
      req.params.id,
      req.body
    );
    res.json(cardFromDB);
  } catch (err) {
    res.status(400).json(err);
  }
});

// admin or specific biz
router.delete("/:id", async (req, res) => {
  try {
    //! joi validation
    const cardFromDB = await cardsServiceModel.deleteCard(req.params.id);
    if (cardFromDB) {
      res.json({ msg: "card deleted" });
    } else {
      res.json({ msg: "could not find the card" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
