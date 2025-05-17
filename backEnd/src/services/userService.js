const db = require("../db/connection_db");
const argon2 = require("argon2");

async function createUser(name, email, password, is_admin = false) {
    const hashedPassword = await argon2.hash(password);
    const [result] = await db.query("INSERT INTO users (name, email, password, is_admin) VALUES (?, ?, ?, ?)", [name, email, hashedPassword, is_admin]);

    return {
        id: result.insertId,
        name,
        email,
        is_admin
    }
}

async function getUserByEmail(email) {
    const [result] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (result.length == 0) {
        return null;
    }
    return result[0];
}

module.exports = {
    createUser,
    getUserByEmail
}