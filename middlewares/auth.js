const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constants');
const UnauthorizedError = require('../errors/unauthorized-err');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers; // достаем токен из заголовка
  if (!authorization || !authorization.startsWith('Bearer ')) { // проверяем есть ли токен или токен пришле без заголовка Bearer
    return next(new UnauthorizedError('Необходима авторизация, отсутствует токен'));
  }
  const token = authorization.replace('Bearer ', ''); // извлечём токен, метод replace, чтобы выкинуть из заголовка приставку 'Bearer '
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET); // верифицируем токен
  } catch {
    return next(new UnauthorizedError('Необходима авторизация, прислан не тот токен'));
  }
  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
