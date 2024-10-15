module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("Role", {
        id: {
            type: Sequelize.INTEGER, // Исправлено с INT на INTEGER
            primaryKey: true,
            autoIncrement: true // Добавлено автоинкрементирование
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false // Добавлено ограничение на null
        }
    });

    return Role;
};
