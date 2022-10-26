const { default: mongoose } = require('mongoose');
const Card = require('../models/card');
const { ERROR_NOT_FOUND, ERROR_BAD_REQUEST, ERROR_INTERNAL } = require('../constants');

// возвращает все карточки
const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => res.status(ERROR_INTERNAL).send({ message: 'Ошибка на стороне сервера' }));
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
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании карточки' });
      }
      return res.status(ERROR_INTERNAL).send({ message: 'Ошибка на стороне сервера' });
    });
};

// удаляет карточку по идентификатору
const deleteCard = (req, res) => {
  Card.findOneAndRemove({
    _id: req.params.cardId,
    owner: req.user._id,
  })
    .orFail(new Error('NotFound'))
    .then(() => {
      res.send({ message: 'Пост удален' });
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Карточка с указанным _id не найдена.' });
      }
      if (err instanceof mongoose.Error.CastError) {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Удаление карточки с некорректным id' });
      }
      return res.status(ERROR_INTERNAL).send({ message: 'Ошибка на стороне сервера' });
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
        return res.status(ERROR_NOT_FOUND).send({ message: 'Передан несуществующий _id карточки' });
      }
      if (err instanceof mongoose.Error.CastError) {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные для постановки/снятии лайка.' });
      }
      return res.status(ERROR_INTERNAL).send({ message: 'Ошибка на стороне сервера' });
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
      res.send(like);
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Передан несуществующий _id карточки' });
      }
      if (err instanceof mongoose.Error.CastError) {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные для постановки/снятии лайка.' });
      }
      return res.status(ERROR_INTERNAL).send({ message: 'Ошибка на стороне сервера' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
};
