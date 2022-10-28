const mongoose = require('mongoose');
const validator = require('validator');

// создать схему для пользователя
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: (value) => /^https?:\/\/(www\.)?[\w\d-]+\.\w/.test(value),
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: (value) => validator.isEmail(value),
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema); // создать модель для пользователя
