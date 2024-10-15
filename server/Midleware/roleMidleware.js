const jwt = require('jsonwebtoken')
const {secret} = require('../config')

module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS"){
            console.log('123')
            next()
        }

        try {
            const token = req.headers.authorization.split(' ')[1]
            console.log(token)
            if (!token) {
                return res.status(403).json({message: "Пользователь не авторизован"})
            }
            const decoded = jwt.verify(token, secret);
            console.log('-----------------------')
            console.log(decoded.roles)
            console.log(decoded)
            console.log(roles[0])
            if (decoded.roles !== roles[0]) {
                return res.status(403).json({message: "У вас нет доступа"})
            }
            console.log(decoded)
            res.status(200);
            req.user = decoded;
            next();
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: "Пользователь не авторизован"})
        }
    }
};