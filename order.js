const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  status: { type: DataTypes.STRING, defaultValue: 'pending' },
  userId: { type: DataTypes.INTEGER, allowNull: true }
}, {
  tableName: 'orders',
  timestamps: true
});

module.exports = Order;
