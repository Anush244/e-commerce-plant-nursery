import { Request, Response } from "express";
import Cart from "../models/Cart";

// 🛒 Add to cart
export const addToCart = async (req: Request, res: Response) => {
  const { productId, name, price, image } = req.body;
  const userId = (req as any).userId;

 console.log("addToCart called. userId:", userId, "body:", req.body);

  if (!userId) return res.status(401).json({ message: "Unauthorized" });
  if (!productId || !name || typeof price !== "number" || !image)
    return res.status(400).json({ message: "Invalid payload" });

  try {
    let item = await Cart.findOne({ userId, productId });

    if (item) {
      item.quantity += 1;
      await item.save();
    } else {
      item = await Cart.create({
        userId,
        productId,
        name,
        price,
        image,
        quantity: 1,
      });
    }
    // console.log("User ID:", (req as any).userId);
console.log("Saved cart item:", item._id);

    return res.json({ message: "Item added to cart", item });
  } catch (err:any) {
    console.error("Add to cart error:", err);
    return res.status(500).json({ error: "Add to cart failed" });
  }
};

// 🧺 Get user's cart
export const getCart = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const items = await Cart.find({ userId });
    return res.json(items);
  } catch (err) {
    console.error("Get cart error:", err);
    return res.status(500).json({ error: "Failed to fetch cart" });
  }
};

// 🔼🔽 Update quantity
export const updateQuantity = async (req: Request, res: Response) => {
  const { productId, type } = req.body;
  const userId = (req as any).userId;

  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const item = await Cart.findOne({ productId, userId });
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity += type === "inc" ? 1 : -1;
    if (item.quantity <= 0) {
      await item.deleteOne();
    } else {
      await item.save();
    }

    return res.json({ message: "Quantity updated", item });
  } catch (err) {
    console.error("Update quantity error:", err);
    return res.status(500).json({ error: "Failed to update quantity" });
  }
};

// ❌ Remove a specific product from cart
export const removeFromCart = async (req: Request, res: Response) => {
  const { productId } = req.body;
  const userId = (req as any).userId;

  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const item = await Cart.findOne({ productId, userId });
    if (!item) return res.status(404).json({ message: "Item not found" });

    await item.deleteOne();
    return res.json({ message: "Item removed from cart" });
  } catch (err) {
    console.error("Remove from cart error:", err);
    return res.status(500).json({ error: "Failed to remove item" });
  }
};

// 🧹 Clear full cart after order
export const clearCart = async (req: Request, res: Response) => {
  const userId = (req as any).userId;

  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    await Cart.deleteMany({ userId });
    return res.json({ message: "Cart cleared successfully" });
  } catch (err) {
    console.error("Clear cart error:", err);
    return res.status(500).json({ error: "Failed to clear cart" });
  }
};
