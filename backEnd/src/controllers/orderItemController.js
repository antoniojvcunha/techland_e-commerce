const orderItemService = require("../services/orderItemService");

async function showItemsByOrderId(req, res) {
    const orderId = +req.params.id;

    try {
        const items = await orderItemService.getOrderItemsByOrderId(orderId);

        if (items.length === 0) {
            return res.status(404).json({ message: "No items found for this order" });
        }

        res.json(items);
    } catch (error) {
        console.error("Error fetching order items:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    showItemsByOrderId
};
