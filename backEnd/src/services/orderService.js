const db = require("../db/connection_db");
const { insertOrderItems } = require("./orderItemService");

async function getAllOrders() {
    const [result] = await db.query("SELECT orders.id, orders.user_id, users.name AS user_name, orders.total_price, orders.created_at, orders.status FROM orders JOIN users ON orders.user_id = users.id ORDER BY orders.created_at DESC");
    return result;
}

async function getOrderById(id) {
    const [result] = await db.query("SELECT * FROM orders WHERE id = ?", [id]);

    if (result.length == 1 ) {
        return result[0];
    } else {
        return null;
    }
}

async function getOrdersByUserId(userId) {
    const [result] = await db.query(`
      SELECT id, total_price, status, created_at
      FROM orders
      WHERE user_id = ?
      ORDER BY created_at DESC
    `, [userId]);
  
    return result;
  }
  

async function createOrder(user_id, items) {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        let total = 0;
        for (const item of items) {
            const [productResult] = await connection.query("SELECT * FROM products WHERE id = ?", [item.product_id]);
            if (productResult.length === 0) throw new Error("Product not found");

            const price = productResult[0].price;
            total += price * item.quantity;
            item.price_unit = price;
        }

        const [orderResult] = await connection.query("INSERT INTO orders (user_id, total_price, status) VALUES (?, ?, ?)", [user_id, total, 'pending']);
        const orderId = orderResult.insertId;

        await insertOrderItems(connection, orderId, items);

        await connection.commit();
        return { id: orderId, total };
    
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

async function updateOrderStatus(orderId, status) {
  const query = 'UPDATE orders SET status = ? WHERE id = ?';
  const [result] = await db.execute(query, [status, orderId]);
  return result.affectedRows > 0;  
}

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrderStatus,
    getOrdersByUserId
}
