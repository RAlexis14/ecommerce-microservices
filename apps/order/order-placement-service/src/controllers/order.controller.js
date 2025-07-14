import { pool } from '../db.js';

export const createOrder = async (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO orders (user_id, product_id, quantity) VALUES (?, ?, ?)',
      [user_id, product_id, quantity]
    );

    res.status(201).json({ message: 'Order created', order_id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

export const getOrdersByUserId = async (req, res) => {
  const { user_id } = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM orders WHERE user_id = ?', [user_id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch orders for user' });
  }
};
