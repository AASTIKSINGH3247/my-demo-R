const { sequelize, User, Product, Order } = require('./models');

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced (force).');

    const alice = await User.create({ name: 'Alice', email: 'alice@example.com' });
    const bob = await User.create({ name: 'Bob', email: 'bob@example.com' });

    const laptop = await Product.create({ name: 'Laptop', price: 1200 });
    const mouse = await Product.create({ name: 'Mouse', price: 25 });

    const order = await Order.create({ userId: alice.id, status: 'pending' });
    await order.addProduct(laptop, { through: { quantity: 1 } });
    await order.addProduct(mouse, { through: { quantity: 2 } });

    console.log('Seed data inserted.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
