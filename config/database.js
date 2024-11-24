const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Prueba1', 'root', 'l0renzana', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, 
});

module.exports = sequelize;
