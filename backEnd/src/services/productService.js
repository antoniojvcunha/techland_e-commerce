const db = require("../db/connection_db");

async function getAllProducts() {
    const [result] = await db.query("SELECT * FROM products")
    return result
    
}

async function getProductById(id) {
    const [result] = await db.query("SELECT * FROM products WHERE id = ?", [id]);

    if (result.length == 1 ) {
        return result[0];
    } else {
        return null;
    }
}

async function getProductsByCategoryName(categoryName) {
    const [result] = await db.query("SELECT p.* FROM products p JOIN categories c ON p.category_id = c.id WHERE c.name = ?", [categoryName]);
    return result;
}

async function insertProduct(name, description, price, image_url, category_id) {
    
    const [result] = await db.query("INSERT INTO products (id, name, description, price, image_url, category_id) VALUES (NULL, ?, ?, ?, ?, ?)", [name, description, price, image_url, category_id]);

    return {
        id: result.insertId,
        name,
        description,
        price,
        image_url,
        category_id
    }
}

async function updateProduct(id, name, description, price, image_url, category_id) {
    const[result] = await db.query("UPDATE products SET name = ?, description = ?, price = ?, image_url = ?, category_id = ? WHERE id = ?", [name, description, price, image_url, category_id, id]);    

    if (result.affectedRows === 0) {
        return null;
    }

    return {
        id,
        name,
        description,
        price,
        image_url,
        category_id
    };
}

async function deleteProductById(id) {
    const [result] = await db.query("DELETE FROM products WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
        return null;
    }

    return true;
}

module.exports = {
    getAllProducts,
    getProductById,
    getProductsByCategoryName,
    insertProduct,
    updateProduct,
    deleteProductById
}