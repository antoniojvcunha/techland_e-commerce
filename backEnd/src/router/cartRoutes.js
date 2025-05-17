const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/cart", cartController.createCart);
router.get("/cart/:userId", cartController.getCartByUserId);
router.delete('/cart/:cartId/clear', cartController.clearCart);
router.get('/cart/active/:userId', cartController.getActiveCart);
router.put('/cart/:cartId/status', cartController.updateCart);


module.exports = router;
