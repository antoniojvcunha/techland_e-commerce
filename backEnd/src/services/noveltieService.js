const db = require("../db/connection_db");

async function getAllNovelties() {
  const [result] = await db.query(`
    SELECT p.*
    FROM products p
    JOIN novelties n ON p.id = n.product_id
  `);
  return result;
}

module.exports = { getAllNovelties };
