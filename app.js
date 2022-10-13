const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

const { PORT = 3000 } = process.env;

app.get('/', (req, res) => {
  res.send('привет');
});

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT, () => {
  console.log('Ссылка на сервер');
});
