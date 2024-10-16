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

const generateAccessToken = (id, email, roles) => {
    const payload = { id, email, roles };
    return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Ошибка при регистрации", errors });
            }
            const { username, role, password, email } = req.body;

            const [rowsName] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
            if (rowsName.length > 0) {
                return res.status(400).json({ message: "Пользователь с таким именем уже существует" });
            }

            const [rowsEmail] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
            if (rowsEmail.length > 0) {
                return res.status(400).json({ message: "Пользователь с таким именем уже существует" });
            }

            const hashPassword = bcrypt.hashSync(password, 7);
            await pool.query('INSERT INTO users (username, password, role, email) VALUES (?, ?, ?, ?)', [username, hashPassword, role, email]);

            return res.json({ message: "Пользователь успешно зарегистрирован" });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Ошибка регистрации' });
        }
    }

    async login(req, res) {
        try {
            const { username, email, password, role} = req.body;
            const [rowsName] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
            if (rowsName.length === 0) {
                return res.status(400).json({ message: `Пользователь ${username} не найден` });
            }
            const user = rowsName[0];

            const [rowsEmale] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
            if (rowsEmale.length === 0) {
                return res.status(400).json({ message: `Пользователь ${username} не найден` });
            }
            const Email = rowsEmale[0];

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
            const token = generateAccessToken(user.id, Email, roles[0]);

            return res.json({ token });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Ошибка входа' });
        }
    }

    async getUsers(req, res) {
        try {
            const [rows] = await pool.query('SELECT * FROM users');
            res.status(200).json(rows);
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Ошибка при получении пользователей' });
        }
    }

    async check(req, res, next) {
        const token = generateAccessToken(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new AuthController();