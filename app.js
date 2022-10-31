const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet'); // модуль для защиты приложения известных веб-уязвимостей
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');
const routes = require('./routes/index'); // импортировать роуты регистарция и авторизация

const app = express();

app.use(express.json());

app.use(helmet()); // безопасность

const { PORT = 3000 } = process.env;

// регистрация и авторизация
app.use(routes);

app.use('/', auth, require('./routes/users'));
app.use('/', auth, require('./routes/cards'));

// обработка несуществующих маршрутов
app.use('*', (req, res, next) => {
  next(new NotFoundError(`Запрашиваемый ресурс ${req.baseUrl} не найден`));
});

mongoose.connect('mongodb://localhost:27017/mestodb');

// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err; // ошибка на сервере по умолчанию
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'Ошибка на стороне сервера'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log('Сервер запущен на порту:', PORT);
});
