const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet'); // модуль для защиты приложения известных веб-уязвимостей
const { ERROR_NOT_FOUND } = require('./constants');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const app = express();

app.use(express.json());

app.use(helmet());

const { PORT = 3000 } = process.env;

app.post('/signin', login); // авторизация
app.post('/signup', createUser); // регистрация

// авторизация
app.use(auth);

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

// обработка несуществующих маршрутов
app.use('*', (req, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Запрашиваемый ресурс не найден' });
});

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT, () => {
  console.log('Сервер запущен на порту:', PORT);
});
