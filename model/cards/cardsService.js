const Card = require("./Card");

const createCard = (cardToSave) => {
  //normalize card
  let card = new Card(cardToSave);
  return card.save();
};

const getAllCards = () => {
  return Card.find();
};

const getCardById = (id) => {
  return Card.findById(id);
};

module.exports = {
  createCard,
  getAllCards,
  getCardById,
};
