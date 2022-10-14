[![Tests for sprint 13](https://github.com/EkaterinaVokin/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/EkaterinaVokin/express-mesto-gha/actions/workflows/tests-13-sprint.yml) [![Tests for sprint 14](https://github.com/EkaterinaVokin/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/EkaterinaVokin/express-mesto-gha/actions/workflows/tests-14-sprint.yml)

# Бэкенд проекта Место
***Проектная работа от ["Яндекс Практикум"](https://practicum.yandex.ru/web/)***



## Настройка бейджей статуса тестов
Перед началом работы над проектом рекомендуется исправить бейджи, отражающие статус прохождения тестов.
Для этого замените разметку бейджей на следующий фрагмент, подставив вместо `${имя_пользователя}` и `${имя репозитория}` соответствующие значения.

```
[![Tests for sprint 13](https://github.com/EkaterinaVokin
/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/EkaterinaVokin
/express-mesto-gha/actions/workflows/tests-13-sprint.yml) 

[![Tests for sprint 14](https://github.com/${имя_пользователя}/${имя репозитория}/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/${имя_пользователя}/${имя репозитория}/actions/workflows/tests-14-sprint.yml)
```

## ⛏ Функциональность: 
* Роуты для пользователей:
 + GET /users — возвращает всех пользователей
 + GET /users/:userId - возвращает пользователя по _id
 + POST /users — создаёт пользователя 
 + PATCH /users/me — обновляет профиль
 + PATCH /users/me/avatar — обновляет аватар
 
 * Роуты для карточек:
  + GET /cards — возвращает все карточки
  + POST /cards — создаёт карточку
  + DELETE /cards/:cardId — удаляет карточку по идентификатору 
  + PUT /cards/:cardId/likes — поставить лайк карточке
  + DELETE /cards/:cardId/likes — убрать лайк с карточки 

----

## 💣 Стэк технологий:
* JavaScrip
* Node.js;
* MongoDB
* Express


----
## 🔮 Цель проекта:
* Взаимодействие с Express и MongoDB
* Описания схем и моделей
* Описания контроллеров и роутов
* CORS. Обработка ошибок.

----

## 📁 Директории:

* `/routes` — папка с файлами роутера  
* `/controllers` — папка с файлами контроллеров пользователя и карточки 
* `/models` — папка с файлами описания схем пользователя и карточки 

-----

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload
