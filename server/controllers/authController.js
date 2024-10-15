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
            const { username, password } = req.body;

            const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
            if (rows.length > 0) {
                return res.status(400).json({ message: "Пользователь с таким именем уже существует" });
            }

            const hashPassword = bcrypt.hashSync(password, 7);
            const [roleRow] = await pool.query('SELECT id FROM roles WHERE name = ?', ['USER']); // Изменено на 'name'
            const roleId = roleRow[0].id;

            await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashPassword]);
            const [newUser] = await pool.query('SELECT id FROM users WHERE username = ?', [username]);
            await pool.query('INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)', [newUser[0].id, roleId]);

            return res.json({ message: "Пользователь успешно зарегистрирован" });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Ошибка регистрации' });
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
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
                'SELECT r.name FROM roles r JOIN user_roles ur ON r.id = ur.role_id WHERE ur.user_id = ?',
                [user.id]
            );
            const roles = roleRows.map(row => row.name); // Изменено на 'name'
            const token = generateAccessToken(user.id, roles);
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