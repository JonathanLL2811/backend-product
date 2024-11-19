const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    partNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    productType: DataTypes.STRING,
    category_code: DataTypes.STRING,
    brand_code: DataTypes.STRING,
    family_code: DataTypes.STRING,
    line_code: DataTypes.STRING,
    productSegment_code: DataTypes.STRING,
    status: DataTypes.STRING,
    value: DataTypes.STRING,
    valueCurrency: DataTypes.STRING,
    defaultQuantityUnits: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    plannerCode: DataTypes.STRING,
    sourceLink: DataTypes.STRING,
}, {
    timestamps: false,
    tableName: 'Product',
});

module.exports = Product;
