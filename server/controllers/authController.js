const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { secret } = require("../config");

// Создание пула соединений MySQL
const pool = mysql.createPool({
    host: '89.111.131.32',
    user: 'user',
    password: '123',
    database: 'newdb',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const generateAccessToken = (id, roles) => {
    const payload = { id, roles };
    return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Ошибка при регистрации", errors });
            }
            const { username, role, password } = req.body;

            const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
            if (rows.length > 0) {
                return res.status(400).json({ message: "Пользователь с таким именем уже существует" });
            }

            const hashPassword = bcrypt.hashSync(password, 7);
            await pool.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashPassword, role]);
            const [newUser] = await pool.query('SELECT id FROM users WHERE username = ?', [username]);

            // Отладочный вывод
            console.log(newUser);

            if (!newUser.length) {
                return res.status(400).json({ message: "Не удалось получить ID нового пользователя" });
            }

            return res.json({ message: "Пользователь успешно зарегистрирован" });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Ошибка регистрации' });
        }
    }

    async login(req, res) {
        try {
            const { username, password, role} = req.body;
            const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
            if (rows.length === 0) {
                return res.status(400).json({ message: `Пользователь ${username} не найден` });
            }
            const user = rows[0];
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: `Введен неверный пароль` });
            }
            const [roleRows] = await pool.query(
                'SELECT role FROM users WHERE role = ?',
                [role]
            );
            console.log([roleRows])
            const roles = roleRows.map(row => row.role);
            console.log(roles);
            const token = generateAccessToken(user.id, roles[0]);

            return res.json({ token });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Ошибка входа' });
        }
    }

    async getUsers(req, res) {
        try {
            const [rows] = await pool.query('SELECT * FROM users');
            res.json(rows);
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Ошибка при получении пользователей' });
        }
    }
}

module.exports = new AuthController();