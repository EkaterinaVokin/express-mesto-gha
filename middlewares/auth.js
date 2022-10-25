const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constants');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers; // достаем токен из заголовка
  if (!authorization || authorization.startWith('Bearer ')) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  const token = authorization.replace('Bearer ', ''); // извлечём токен, метод replace, чтобы выкинуть из заголовка приставку 'Bearer '
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET); // верифицируем токен
  } catch {
    return res.status(401).seng({ message: 'Необходима авторизация' });
  }
  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
