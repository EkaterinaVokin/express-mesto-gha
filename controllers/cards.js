const { default: mongoose } = require('mongoose');
const Card = require('../models/card');

// возвращает все карточки
const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
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
    .then((card) => card.populate('owner'))
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({ message: 'Переданы некорректные данные при создании карточки', err });
      }
      return res.status(500).send({ message: 'Ошибка на стороне сервера', err });
    });
};

// удаляет карточку по идентификатору
const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId).orFail(new Error('NotFound'))
    .then(() => {
      res.status(200).send({ message: 'Пост удален' });
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
      }
      return res.status(500).send({ message: 'Ошибка на стороне сервера', err });
    });
};

// поставить лайк карточке
const putLike = (req, res) => {
  const owner = req.user._id; // _id пользователя
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: owner } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .populate('owner').orFail(new Error('NotFound'))
    .then((like) => {
      res.status(201).send(like);
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(404).send({ message: 'Передан несуществующий _id карточки' });
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({ message: 'Переданы некорректные данные для постановки/снятии лайка.', err });
      }
      return res.status(500).send({ message: 'Ошибка на стороне сервера', err });
    });
};

// убрать лайк с карточки
const deleteLike = (req, res) => {
  const owner = req.user._id; // _id пользователя
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: owner } }, // убрать _id из массива
    { new: true },
  )
    .populate('owner').orFail(new Error('NotFound'))
    .then((like) => {
      res.status(200).send(like);
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(404).send({ message: 'Передан несуществующий _id карточки' });
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({ message: 'Переданы некорректные данные для постановки/снятии лайка.', err });
      }
      return res.status(500).send({ message: 'Ошибка на стороне сервера', err });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
};
