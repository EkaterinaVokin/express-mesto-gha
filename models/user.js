const mongoose = require('mongoose');
const validator = require('validator');

// создать схему для пользователя
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
      validate: (value) => {
        if (validator.isURL(value)) {
          return true;
        }
        return false;
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: (value) => {
        if (validator.isEmail(value)) {
          return true;
        }
        return false;
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema); // создать модель для пользователя
