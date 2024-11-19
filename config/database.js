const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Product', 'root', 'L0renzana2811@', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, 
});

module.exports = sequelize;
