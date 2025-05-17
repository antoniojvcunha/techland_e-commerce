const db = require("../db/connection_db");

async function createCart(userId) {
    const [result] = await db.query("INSERT INTO carts (user_id, status) VALUES (?, 'pending')", [userId]);
    return {
        id: result.insertId,
        user_id: userId,
        status: 'pending'
    };
}

async function getCartByUserId(userId, status = 'pending') {
  const [result] = await db.query(
    "SELECT * FROM carts WHERE user_id = ? AND status = ? LIMIT 1",
    [userId, status]
  );
  return result[0] || null;
}

async function deleteCartByUserId(userId) {
    const [result] = await db.query("DELETE FROM carts WHERE user_id = ?", [userId]);
    return result.affectedRows > 0;
}

async function clearCart(cartId) {
    await db.query("DELETE FROM cart_items WHERE cart_id = ?", [cartId]);
}

async function completeCart(cartId) {
    const [result] = await db.query(
        "UPDATE carts SET status = 'completed' WHERE id = ? AND status = 'pending'",
        [cartId]
    );
    return result.affectedRows > 0;
}

async function getCartById(cartId) {
    const [result] = await db.query("SELECT * FROM carts WHERE id = ?", [cartId]);
    return result[0];
}

async function updateCartStatus(cartId, status) {
  const [result] = await db.query("UPDATE carts SET status = ? WHERE id = ?", [status, cartId]);
  return result.affectedRows > 0;
}

    
module.exports = {
    createCart,
    getCartByUserId,
    deleteCartByUserId,
    clearCart,
    completeCart,
    getCartById,
    updateCartStatus
}