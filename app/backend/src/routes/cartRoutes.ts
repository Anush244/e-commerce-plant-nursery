import express from 'express';
import {
  addToCart,
  getCart,
  updateQuantity,
  removeFromCart,
  clearCart, 
} from '../controllers/cartController';
import authMiddleware from '../middleware/auth';


const router = express.Router();


router.post('/add', authMiddleware, addToCart);
router.get('/', authMiddleware, getCart);
router.post('/update', authMiddleware, updateQuantity);
router.post('/remove', authMiddleware, removeFromCart);
router.post('/clear', authMiddleware, clearCart); // 

export default router;
