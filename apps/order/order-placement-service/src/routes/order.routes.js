import express from 'express';
import { createOrder, getOrders } from '../controllers/order.controller.js';

const router = express.Router();

router.post('/create', createOrder);
router.get('/list', getOrders);



export default router;
