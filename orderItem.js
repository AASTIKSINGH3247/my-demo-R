const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrderItem = sequelize.define('OrderItem', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  orderId: { type: DataTypes.INTEGER },
  productId: { type: DataTypes.INTEGER },
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 }
}, {
  tableName: 'orderItems',
  timestamps: true
});

module.exports = OrderItem;
