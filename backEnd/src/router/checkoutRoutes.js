const express = require("express");
const router = express.Router();
const { authenticate } = require('../middlewares/authValidation');
const stripeController = require("../controllers/stripeController");
const checkoutController = require("../controllers/checkoutController");

router.post("/checkout", authenticate, stripeController.createCheckoutSession );
router.post("/complete-purchase", authenticate, checkoutController.completePurchase);


module.exports = router;
