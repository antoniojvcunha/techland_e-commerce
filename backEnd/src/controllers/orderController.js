const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const orderService = require("../services/orderService");
const orderItemService = require("../services/orderItemService");
const cartService = require('../services/cartService');
const cartItemService = require('../services/cartItemService');

async function index(req, res) {
    try {
        const orders = await orderService.getAllOrders();
        res.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getUserOrders(req, res) {
  const userId = req.user.id;

  try {
    const orders = await orderService.getOrdersByUserId(userId);

    if (!orders || orders.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
  
async function showOrderById(req, res) {
    const id = +req.params.id;

    try {
        const order = await orderService.getOrderById(id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(order);
    } catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({ error: "Internal server error" });
    }   
}

async function updateOrderStatus(req, res) {
  const { orderId, status } = req.body;

  if (!orderId || !status) {
    return res.status(400).json({ message: "OrderId and status are required" });
  }

  try {
    const updated = await orderService.updateOrderStatus(orderId, status);

    if (updated) {
      return res.status(200).json({ message: "Status updated successfully" });
    } else {
      return res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



async function getOrderDetails(req, res) {
    const orderId = +req.params.id;
    const userId = req.user.id; 

    if (!orderId || isNaN(orderId)) {
  return res.status(400).json({ message: "Invalid order id" });
}

    try {
        const order = await orderService.getOrderById(orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (order.user_id !== userId) {
            return res.status(403).json({ message: "You do not have permission to access this order" });
        }

        const items = await orderItemService.getOrderItemsByOrderId(orderId);

       const response = {
  id: order.id,
  created_at: order.created_at,
  total_price: order.total_price,
  items: items.map(item => ({
    product_id: item.product_id,
    name: item.product_name,
    description: item.product_description,
    image_url: item.image_url,  
    quantity: item.quantity,
    price_unit: item.price_unit
  })),
};
        res.json(response);
    } catch (error) {
        console.error("Error fetching order details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}



const createOrder = async (req, res) => {
  try {
    const { userId } = req.body;

    const cartItems = await cartService.getCartItems(userId);

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const newOrder = await orderService.createOrder(userId, totalPrice, cartItems);

    await cartService.clearCart(userId);

    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating order" });
  }
};

async function createCheckoutSession(req, res) {
  const { cartId } = req.body;
  const userId = req.user.id;  

  const cartItems = await cartItemService.getItemsByCartId(cartId);

  if (cartItems.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const order = await orderService.createOrder(userId, "pending"); 

  const orderItems = cartItems.map(item => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.price,
  }));

  await orderService.createOrderItems(orderItems); 

  const line_items = cartItems.map(item => ({
    price_data: {
      currency: 'eur',
      product_data: {
        name: item.name,
        ...(item.image_url ? { images: [item.image_url] } : {}),
      },
      unit_amount: Math.round(item.price * 100),  
    },
    quantity: item.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: line_items,
      mode: 'payment',
      success_url: `http://localhost:5173/success?orderId=${order.id}`,
      cancel_url: `http://localhost:5173/cart`, 
      client_reference_id: order.id, 
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function confirmPayment(req, res) {
    const { sessionId, userId } = req.body;
  
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
  
      if (session.payment_status === "paid") {
        const orderId = session.client_reference_id; 
        await orderService.updateOrderStatus(orderId, "completed"); 
  
        await cartItemService.clearCart(userId); 
  
        return res.status(200).json({ message: "Payment successful" });
      } else {
        return res.status(400).json({ message: "Payment not confirmed" });
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  
module.exports = {
    index,
    showOrderById,
    updateOrderStatus,
    getOrderDetails,
    getUserOrders,
    createOrder,
    createCheckoutSession,
    confirmPayment,
};
