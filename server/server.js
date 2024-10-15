const express = require ('express');
const cors = require('cors');
const events = require('events');
const PORT = 5000;
const OpenAI = require('openai');
const auth = require('./routes/auth')

const emitter = new events.EventEmitter();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: "123"})
})

app.use("/signin", auth);

//Long Pulling method
app.get('/get-message', (req, res) => {
    emitter.once('newMessage', (message) => {
        res.json(message)
    })
})

app.post('/new-message', (req, res) => {
    const message = req.body;
    emitter.emit('newMessage', message);
    res.status(200);

})

// DateBase
const mysql = require('mysql2');

// Создание подключения к базе данных с вашими данными
const connection = mysql.createConnection({
    host: '89.111.131.32',
    user: 'user',
    password: '123',
    database: 'newdb',
    port: 3306
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

// Закрытие соединения
process.on('exit', () => {
    connection.end();
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})