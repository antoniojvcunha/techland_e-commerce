const { createContact } = require("../services/contactUsService");

async function handleContactForm(req, res) {
  try {
    const { name, email, country, city, topic, message } = req.body;
    if (!name || !email || !country || !city || !topic || !message) {
      return res.status(400).json({ error: "Required fields are missing" });
    }
    const contactId = await createContact({ name, email, country, city, topic, message });
    res.status(201).json({ success: true, id: contactId });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { handleContactForm };
