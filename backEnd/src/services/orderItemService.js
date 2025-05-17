const db = require("../db/connection_db");

async function getOrderItemsByOrderId(orderId) { 
  const [result] = await db.query(`
    SELECT 
      oi.order_id, 
      oi.product_id, 
      oi.quantity, 
      oi.price_unit, 
      p.name AS product_name, 
      p.description AS product_description,
      p.image_url
    FROM order_items oi 
    JOIN products p ON oi.product_id = p.id 
    WHERE oi.order_id = ?
  `, [orderId]);

  return result;
}

async function insertOrderItems(connection, orderId, items) {
    const orderItems = items.map(item => [
        orderId,
        item.product_id,
        item.quantity,
        item.price_unit
    ]);

    await connection.query(
        "INSERT INTO order_items (order_id, product_id, quantity, price_unit) VALUES ?",
        [orderItems]
      );
      
}

module.exports = {
    insertOrderItems,
    getOrderItemsByOrderId
}