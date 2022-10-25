const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  ERROR_NOT_FOUND, ERROR_BAD_REQUEST, ERROR_INTERNAL, JWT_SECRET,
} = require('../constants');

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
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    // eslint-disable-next-line arrow-body-style
    .then((hash) => {
      return User.create({
        name, about, avatar, email, password: hash,
      });
    })
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

// ищем пользователя
const login = (req, res) => {
  const { email, password } = req.body; // получили данные
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль')); // пользователь не найден отклоняем промис
      }
      return user; // возвращаем пользователя
    })
    // eslint-disable-next-line arrow-body-style
    .then((user) => {
      return bcrypt.compare(password, user.password) // сравниваем переданный пароль и хеш из БД
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль')); // хеши не совпали — отклоняем промис
          }
          const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' }); // создаем токен если совпали емаил и пароль
          return token; // возвращаем токен
        });
    })
    .then((token) => {
      res.send({ token }).cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
      }); // отправляем токен и сохраняем его в куках
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  login,
};
