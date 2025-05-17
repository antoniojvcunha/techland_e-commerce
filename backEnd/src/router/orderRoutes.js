const router = require("express").Router();
const orderController = require("../controllers/orderController");
const { authenticate } = require('../middlewares/authValidation');


router.get("/orders", authenticate, orderController.getUserOrders);
router.get("/orders/:id", authenticate, orderController.showOrderById);
router.post("/orders",  authenticate, orderController.createOrder);
router.put("/orders/status", authenticate, orderController.updateOrderStatus);
router.get('/orders/:id/details', authenticate, orderController.getOrderDetails);
router.post('/orders/:orderId/pay', authenticate, orderController.updateOrderStatus);


module.exports = router;