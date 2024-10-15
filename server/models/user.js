module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", { // Исправлено название модели на User
        username: {
            type: Sequelize.STRING, // Исправлено с string на STRING
            primaryKey: true,
            allowNull: false // Добавлено ограничение на null
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false, // Добавлено ограничение на null
            unique: true // Добавлено уникальное значение
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false // Добавлено ограничение на null
        }
    });

    return User;
};