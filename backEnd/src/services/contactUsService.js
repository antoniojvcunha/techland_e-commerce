const db = require("../db/connection_db");

async function createContact({ name, email, country, city, topic, message }) {
  const [result] = await db.query(
    `INSERT INTO contact_us (name, email, country, city, topic, message) VALUES (?, ?, ?, ?, ?, ?)`,
    [name, email, country, city, topic, message]
  );
  return result.insertId;
}

module.exports = { createContact };
