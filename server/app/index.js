const mysql = require('mysql2');

// Создание подключения к базе данных
const connection = mysql.createConnection({
    host: 'localhost', // или ваш хост
    user: 'your_username', // замените на ваше имя пользователя
    password: 'your_password', // замените на ваш пароль
    database: 'your_database_name' // замените на имя вашей базы данных
});

// Подключение к базе данных
connection.connect((err) => {
    if (err) {
        console.error('Ошибка подключения к MySQL: ', err);
        return;
    }
    console.log('Успешно подключено к MySQL');

    // SQL-запрос для создания таблицы Roles
    const createRolesTable = `
    CREATE TABLE IF NOT EXISTS Roles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );
  `;

    // SQL-запрос для создания таблицы User
    const createUserTable = `
    CREATE TABLE IF NOT EXISTS User (
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      roleId INT,
      FOREIGN KEY (roleId) REFERENCES Roles(id)
    );
  `;

    // Создание таблицы Roles
    connection.query(createRolesTable, (err, results) => {
        if (err) {
            console.error('Ошибка создания таблицы Roles: ', err);
            return;
        }
        console.log('Таблица Roles успешно создана');
    });

    // Создание таблицы User
    connection.query(createUserTable, (err, results) => {
        if (err) {
            console.error('Ошибка создания таблицы User: ', err);
            return;
        }
        console.log('Таблица User успешно создана');
    });
});



// Закрытие соединения (по необходимости, например, после завершения всех запросов)
process.on('exit', () => {
    connection.end();
});