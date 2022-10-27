const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet'); // модуль для защиты приложения известных веб-уязвимостей
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');

const app = express();

app.use(express.json());

app.use(helmet()); // безопасность

const { PORT = 3000 } = process.env;

app.post('/signin', login); // авторизация
app.post('/signup', createUser); // регистрация

// авторизация
app.use(auth);

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

// обработка несуществующих маршрутов
app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

mongoose.connect('mongodb://localhost:27017/mestodb');

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err; // ошибка на сервере по умолчанию
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'Ошибка на стороне сервера'
        : message,
    });
});

app.listen(PORT, () => {
  console.log('Сервер запущен на порту:', PORT);
});
