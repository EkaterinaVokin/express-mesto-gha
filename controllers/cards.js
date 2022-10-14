const { default: mongoose } = require('mongoose');
const Card = require('../models/card');

// возвращает все карточки
const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) => res.status(500).send({ message: 'Ошибка на стороне сервера', err }));
};

// создаёт карточку
const createCard = (req, res) => {
  const owner = req.user._id; // _id пользователя
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({ message: 'Запрос был неправильно сформирован', err });
      }
      return res.status(500).send({ message: 'Ошибка на стороне сервера', err });
    });
};

// удаляет карточку по идентификатору
const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => res.status(500).send({ message: 'Ошибка на стороне сервера', err }));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
