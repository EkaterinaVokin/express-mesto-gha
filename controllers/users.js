const { default: mongoose } = require('mongoose');
const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => res.status(500).send({ message: 'Ошибка на стороне сервера', err }));
};

const getUserById = (req, res) => {
  User.findById(req.params.id).orFail(new Error('NotFound'))
    .then((user) => {
      res.send(user);
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

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
