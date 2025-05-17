const cartService = require("../services/cartService");
const orderService = require("../services/orderService");
const {getItemsByCartId} = require("../services/cartItemService");
const cartItemService = require('../services/cartItemService');


async function checkout(req, res) {
    const cartId = +req.params.cartId;
    const { user_id } = req.body;

    if (isNaN(cartId)) {
        return res.status(400).json({ message: "Invalid cart ID" });
    }

    try {
        const cart = await cartService.getCartById(cartId);
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        if (cart.user_id !== user_id) {
            return res.status(400).json({ message: "Cart ID mismatch" });
        }

        if (cart.status !== "pending") {
            return res.status(400).json({ message: "Cart already completed" });
        }

        const cartItems = await getItemsByCartId(cartId);
        if (!cartItems.length) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const formattedItems = cartItems.map(item => ({
            product_id: item.product_id,
            quantity: item.quantity,
            price_unit: item.price
        }));

        const order = await orderService.createOrder(user_id, formattedItems);

        const success = await cartService.updateCartStatus(cartId, 'completed');

        if (!success) {
            return res.status(500).json({ message: "Failed to complete cart" });
        }

        res.status(200).json({
            message: "Checkout completed successfully.",
            order
        });

        await cartService.clearCart(cartId);
    } catch (error) {
        console.error("Error completing checkout:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const completePurchase = async (req, res) => {
  const { orderId, cartId } = req.body;
  const userId = req.user.id;

  if (!userId) return res.status(400).json({ message: "User not authenticated" });
  if (!orderId || !cartId) return res.status(400).json({ message: "orderId ou cartId faltando" });

  try {
    const updated = await orderService.updateOrderStatus(orderId, "completed");
if (!updated) {
      return res.status(404).json({ message: "Order not found or not updated" });
    }
      const cart = await cartService.getCartByUserId(userId);
if (!cart || cart.user_id !== userId || cart.status !== 'completed') {
  return res.status(404).json({ message: "Cart not found or invalid" });
}


 if (cart) {
        await cartService.updateCartStatus(cart.id, "completed");
    }

    await cartItemService.clearCart(cartId);

    res.status(200).json({ message: "Buy completed successfully", orderId });
  } catch (error) {
    console.error("Error completing purchase:", error);
    res.status(500).json({ message: "Error completing purchase" });
  }
};


module.exports = { checkout, completePurchase };
