const cartItemService = require("../services/cartItemService");
const cartService = require("../services/cartService");

async function addItem(req, res) {
    const { user_id, cart_id, product_id, quantity } = req.body;

    if (!product_id || !quantity || (!user_id && !cart_id)) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    try {
        let targetCartId;

        if (cart_id) {
            targetCartId = cart_id;
        } else {
            let cart = await cartService.getCartByUserId(user_id);

            if (!cart) {
                const newCartId = await cartService.createCart(user_id);
                targetCartId = newCartId;
            } else {
                targetCartId = cart.id;
            }
        }
        await cartItemService.addItemToCart(targetCartId, product_id, quantity);

        res.status(201).json({ message: "Item added to cart.", cart_id: targetCartId });
    } catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
async function getCartItems(req, res) {
    const cartId = +req.params.cartId;

    if (isNaN(cartId)) {
        return res.status(400).json({ message: "Invalid or missing cart ID" });
    }

    try {
        const items = await cartItemService.getItemsByCartId(cartId);
        res.status(200).json(items);
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function updateQuantity(req, res) {
    const itemId = +req.params.itemId;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
        return res.status(400).json({ message: "Invalid quantity." });
    }

    try {
        const updated = await cartItemService.updateCartItemQuantity(itemId, quantity);

        if (!updated) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json({ message: "Quantity updated." });
    } catch (error) {
        console.error("Error updating quantity:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function removeItem(req, res) {
    const itemId = +req.params.itemId;

    try {
        const removed = await cartItemService.removeItemFromCart(itemId);

        if (!removed) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json({ message: "Item removed from cart." });
    } catch (error) {
        console.error("Error removing item:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    addItem,
    getCartItems,
    updateQuantity,
    removeItem
};
