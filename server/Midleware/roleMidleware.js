const jwt = require('jsonwebtoken')
const {secret} = require('../config')

module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }

        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: "Пользователь не авторизован"})
            }
            const decoded = jwt.verify(token, secret)
            if (decoded.role !== roles) {
                return res.status(403).json({message: "У вас нет доступа"})
            }
            res.status(200);
            req.user = decoded;
            next();
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: "Пользователь не авторизован"})
        }
    }
};