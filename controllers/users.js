const { default: mongoose } = require('mongoose');
const User = require('../models/user');
const { ERROR_NOT_FOUND, ERROR_BAD_REQUEST, ERROR_INTERNAL } = require('../constants');

// возвращает всех пользователей
const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => res.status(ERROR_INTERNAL).send({ message: 'Ошибка на стороне сервера' }));
};

// возвращает пользователя по _id
const getUserById = (req, res) => {
  User.findById(req.params.userId).orFail(new Error('NotFound'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Пользователя с запрошенным _id не существует' });
      }
      if (err instanceof mongoose.Error.CastError) {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Не корректный _id' });
      }
      return res.status(ERROR_INTERNAL).send({ message: 'Ошибка на стороне сервера' });
    });
};

// создаёт пользователя
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Запрос был неправильно сформирован' });
      }
      return res.status(ERROR_INTERNAL).send({ message: 'Ошибка на стороне сервера' });
    });
};

// обновляет профиль
const updateProfile = (req, res) => {
  const owner = req.user._id; // _id пользователя
  const { name, about } = req.body;
  User.findByIdAndUpdate(owner, { name, about }, { new: true, runValidators: true }).orFail(new Error('NotFound'))
    .then((newUser) => {
      res.send(newUser);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      }
      if (err.message === 'NotFound') {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Пользователя с запрошенным _id не существует' });
      }
      return res.status(ERROR_INTERNAL).send({ message: 'Ошибка на стороне сервера' });
    });
};

// обновляет аватар
const updateAvatar = (req, res) => {
  const owner = req.user._id; // _id пользователя
  const { avatar } = req.body;
  User.findByIdAndUpdate(owner, { avatar }, { new: true, runValidators: true }).orFail(new Error('NotFound'))
    .then((newAvatar) => {
      res.send(newAvatar);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      }
      if (err.message === 'NotFound') {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Пользователя с запрошенным _id не существует' });
      }
      return res.status(ERROR_INTERNAL).send({ message: 'Ошибка на стороне сервера' });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
