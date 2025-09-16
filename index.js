const sequelize = require('../config/database');

const User = require('./user');
const Product = require('./product');
const Order = require('./order');
const OrderItem = require('./orderItem');
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Order.belongsToMany(Product, { through: OrderItem, foreignKey: 'orderId', otherKey: 'productId' });
Product.belongsToMany(Order, { through: OrderItem, foreignKey: 'productId', otherKey: 'orderId' });
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

module.exports = { sequelize, User, Product, Order, OrderItem };
