const { Order, Product, OrderItem, User } = require('../models');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: Product, through: { attributes: ['quantity'] } },
        { model: User, attributes: ['id', 'name', 'email'] }
      ]
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createOrder = async (req, res) => {
  const { userId, items } = req.body;
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'items array is required' });
  }

  try {
    const order = await Order.create({ userId, status: 'pending' });

    for (const it of items) {
      const product = await Product.findByPk(it.productId);
      if (!product) continue;
      await order.addProduct(product, { through: { quantity: it.quantity || 1 } });
    }

    const created = await Order.findByPk(order.id, {
      include: [
        { model: Product, through: { attributes: ['quantity'] } },
        { model: User, attributes: ['id', 'name', 'email'] }
      ]
    });

    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
