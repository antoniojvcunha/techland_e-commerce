const express = require("express");
const router = express.Router();
const cartItemController = require("../controllers/cartItemController");

router.post("/cart-items", cartItemController.addItem);
router.get("/cart-items/:cartId", cartItemController.getCartItems);
router.put("/cart-items/:itemId", cartItemController.updateQuantity);
router.delete("/cart-items/:itemId", cartItemController.removeItem);

module.exports = router;
