import express from 'express';
import dotenv from 'dotenv';
import orderRoutes from './routes/order.routes.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/orders', orderRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Order Placement Service running on port ${PORT}`);
});

export default app;
