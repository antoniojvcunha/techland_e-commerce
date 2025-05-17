const db = require("../db/connection_db");

async function addItemToCart(cartId, productId, quantity) {
    const [result] = await db.query(
        "SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?",
        [cartId, productId]
    );

    if (quantity <= 0) {
        throw new Error("Quantity must be greater than 0");
    }

    if (result.length > 0) {
        const newQuantity = result[0].quantity + quantity;
        await db.query(
            "UPDATE cart_items SET quantity = ? WHERE id = ?",
            [newQuantity, result[0].id]
        );
    } else {
        await db.query(
            "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)",
            [cartId, productId, quantity]
        );
    }
}

async function getItemsByCartId(cartId) {
    const [result] = await db.query(
        `SELECT ci.id AS cart_item_id, ci.product_id, p.name, p.price, ci.quantity, p.image_url 
         FROM cart_items ci
         JOIN products p ON ci.product_id = p.id
         WHERE ci.cart_id = ?`,
        [cartId]
    );
    return result;
}

async function updateCartItemQuantity(itemId, newQuantity) {
    const [result] = await db.query(
        "UPDATE cart_items SET quantity = ? WHERE id = ?",
        [newQuantity, itemId]
    );
    return result.affectedRows > 0;
}

async function removeItemFromCart(itemId) {
    const [result] = await db.query(
        "DELETE FROM cart_items WHERE id = ?",
        [itemId]
    );
    return result.affectedRows > 0;
}

async function clearCart(cartId) {
await db.query("DELETE FROM cart_items WHERE user_id = ?", [cartId]);
  }
  
module.exports = {
    addItemToCart,
    getItemsByCartId,
    updateCartItemQuantity,
    removeItemFromCart,
    clearCart
};
