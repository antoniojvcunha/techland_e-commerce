const router = require("express").Router();
const orderItemController = require("../controllers/orderItemController");

router.get("/orders/:id/items", orderItemController.showItemsByOrderId);

module.exports = router;
