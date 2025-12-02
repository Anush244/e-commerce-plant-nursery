import { Request, Response } from "express";
import Order from "../models/Order";
import Cart from "../models/Cart";

// Extend Request type to include userId (added by authMiddleware)
interface AuthRequest extends Request {
  userId?: string;
}

export const placeOrder = async (req: AuthRequest, res: Response) => {
  const { name, address, payment } = req.body;
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!name || !address || !["Cash on Delivery", "UPI", "Card"].includes(payment)) {
    return res.status(400).json({ message: "Invalid payload" });
  }

  try {
    const cartItems = await Cart.find({ userId });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const items = cartItems.map((ci) => ({
      productId: ci.productId,
      name: ci.name,
      priceAtPurchase: ci.price,
      quantity: ci.quantity,
      image: ci.image,
    }));

    const total = items.reduce(
      (sum, i) => sum + i.priceAtPurchase * i.quantity,
      0
    );

    const newOrder = await Order.create({
      userId,
      name,
      address,
      payment,
      items,
      total,
    });

    // ✅ clear cart after order success
    await Cart.deleteMany({ userId });

    return res.json({
      message: "Order placed successfully",
      orderId: newOrder._id,
    });
  } catch (err) {
    console.error("❌ Order error:", err);
    return res.status(500).json({ error: "Failed to place order" });
  }
};
