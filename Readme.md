## Тестовое задание: SPA таблица React

#### Используемые инструменты

- **Frontend** - React, axios, bootstrap
- **Database** - PostgrSQL
- **Backend** - express (node.js)

Сортировка по столбцам осуществляется при нажатии на соответствующий столбец.

Фильтрация осуществляется при нажатии клавиши Enter в поле ввода текста.

#### Установка и запуск

Для запуска потребуется Docker, однако можно запустить фронтенд и бекенд вручную.

##### Без Docker'а

- Запустите PostgreSQL и создайте базу данных table_db
    - Пароль и пользователь по умолчанию root и postgres соответственно 
- В файле backend/config/default.json замените значение DBHOST с postgresqldb на localhost
- В директории backend выполните команду npm i && npm start
- В директории frontend выполните команду npm i && npm start
- Откройте (http://localhost:3000)

##### С ипользованием Docker

- Склонируйте репозиторий
- Введите в корневой директрии команду docker-compose up --build
- Откройте (http://localhost:3000)