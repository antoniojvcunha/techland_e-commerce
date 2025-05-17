const cartService = require("../services/cartService");
const cartItemService = require("../services/cartItemService");

async function createCart(req, res) {
    const userId = +req.body.user_id;

    try {
        const cartId = await cartService.createCart(userId);
        res.status(201).json({ message: "Cart created successfully", cartId });
    } catch (error) {
        console.error("Error creating cart:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
async function getCartByUserId(req, res) {
    const userId = +req.params.userId;

    try {
        let cart = await cartService.getCartByUserId(userId);

        if (!cart) {
            cart = await cartService.createCart(userId);
            return res.status(201).json(cart);
        }
        cart.items = await cartItemService.getItemsByCartId(cart.id);
        res.status(200).json(cart);
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function clearCart(req, res) {
    const cartId = +req.params.cartId;
    try {
        const cart = await cartService.clearCart(cartId);
        res.status(200).json({ message: "Cart cleared successfully", cart });
    } catch (error) {
        console.error("Error clearing cart:", error);
        res.status(500).json({ error: "Internal server error" });
    }
    
}

async function getActiveCart(req, res) {
    const userId = +req.params.userId;
    try {
        let cart = await cartService.getCartByUserId(userId);
        
        if (!cart) {
            cart = await cartService.createCart(userId);
            return res.status(201).json(cart);
        }
        
        res.status(200).json(cart);
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function updateCart(req, res) {
  const cartId = +req.params.cartId;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Status is required" });
  }

  try {
    const updated = await cartService.updateCartStatus(cartId, status);

    if (updated) {
      return res.status(200).json({ message: "Cart updated successfully" });
    } else {
      return res.status(404).json({ error: "Cart not found" });
    }
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports = {
    createCart,
    getCartByUserId,
    clearCart,
    getActiveCart,
    updateCart
};
