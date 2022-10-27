const router = require('express').Router();
const {
  getUsers, getUserById, updateProfile, updateAvatar, getMe,
} = require('../controllers/users');

router.get('/users', getUsers); // возвращает всех пользователей
router.get('/users/me', getMe); // возвращает пользователя
router.get('/users/:userId', getUserById); // возвращает пользователя по _id
router.patch('/users/me', updateProfile); // обновляет профиль
router.patch('/users/me/avatar', updateAvatar); // обновляет аватар

module.exports = router;
