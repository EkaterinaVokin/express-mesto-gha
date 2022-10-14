const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

const { PORT = 3000 } = process.env;

app.use((req, res, next) => {
  req.user = {
    _id: '63480ba1154a2b3491ed58c8',
  };

  next();
});

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

// обработка несуществующих маршрутов
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресур не найден' });
});

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT, () => {
  console.log('Ссылка на сервер');
});
