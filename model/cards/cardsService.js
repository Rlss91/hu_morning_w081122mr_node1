const Card = require("./Card");

const createCard = (cardToSave) => {
  //normalize card
  let card = new Card(cardToSave);
  return card.save();
};

module.exports = {
  createCard,
};
