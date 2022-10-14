const { default: mongoose } = require('mongoose');
const User = require('../models/user');

// возвращает всех пользователей
const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => res.status(500).send({ message: 'Ошибка на стороне сервера', err }));
};

// возвращает пользователя по _id
const getUserById = (req, res) => {
  User.findById(req.params.userId).orFail(new Error('NotFound'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(404).send({ message: 'Пользователя с запрошенным _id не существует' });
      }
      if (err instanceof mongoose.Error.CastError) {
        return res.status(400).send({ message: 'Не корректный _id', err });
      }
      return res.status(500).send({ message: 'Ошибка на стороне сервера', err });
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
        return res.status(400).send({ message: 'Запрос был неправильно сформирован', err });
      }
      return res.status(500).send({ message: 'Ошибка на стороне сервера', err });
    });
};

// обновляет профиль
const updateProfile = (req, res) => {
  const owner = req.user._id; // _id пользователя
  const { name, about } = req.body;
  User.findByIdAndUpdate(owner, { name, about }, { new: true, runValidators: true }).orFail(new Error('NotFound'))
    .then((newUser) => {
      res.status(200).send(newUser);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля', err });
      }
      if (err.message === 'NotFound') {
        return res.status(404).send({ message: 'Пользователя с запрошенным _id не существует' });
      }
      return res.status(500).send({ message: 'Ошибка на стороне сервера', err });
    });
};

// обновляет аватар
const updateAvatar = (req, res) => {
  const owner = req.user._id; // _id пользователя
  const { avatar } = req.body;
  User.findByIdAndUpdate(owner, { avatar }, { new: true, runValidators: true }).orFail(new Error('NotFound'))
    .then((newAvatar) => {
      res.status(200).send(newAvatar);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля', err });
      }
      if (err.message === 'NotFound') {
        return res.status(404).send({ message: 'Пользователя с запрошенным _id не существует' });
      }
      return res.status(500).send({ message: 'Ошибка на стороне сервера', err });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
