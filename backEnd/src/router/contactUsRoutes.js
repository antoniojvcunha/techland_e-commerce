const express = require("express");
const router = express.Router();
const contactUsController = require("../controllers/contactUsController");

router.post("/contactus", contactUsController.handleContactForm);

module.exports = router;