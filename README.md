[![Tests for sprint 13](https://github.com/EkaterinaVokin/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/EkaterinaVokin/express-mesto-gha/actions/workflows/tests-13-sprint.yml) [![Tests for sprint 14](https://github.com/EkaterinaVokin/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/EkaterinaVokin/express-mesto-gha/actions/workflows/tests-14-sprint.yml)

# Бэкенд проекта Место
***Проектная работа от ["Яндекс Практикум"](https://practicum.yandex.ru/web/)***

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

## 🚀 Запуск проекта:

#### Клонировать репозиторий:
```
git clone https://github.com/EkaterinaVokin/express-mesto-gha.git
```
#### Установить зависимости:

```
npm install
```
#### Запустить приложение:

```
npm run start
```
#### Запустить сервер с hot-reload:

```
npm run dev
```

