const db = require("../db/connection_db");

async function getBestSellers() {
    const [result] = await db.query("SELECT products.id, products.name, products.description, products.price, products.image_url FROM best_sellers JOIN products ON best_sellers.product_id = products.id");
    return result;
}

module.exports = {
    getBestSellers
};