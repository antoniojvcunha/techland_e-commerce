const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cartItemService = require('../services/cartItemService');
const orderService = require('../services/orderService');

const createCheckoutSession = async (req, res) => {
      const { cartId, userId } = req.body;

  try {

    const cartItems = await cartItemService.getItemsByCartId(cartId);
    
    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    const order = await orderService.createOrder(userId, cartItems);

    const line_items = cartItems.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          // ...(item.image_url ? { images: [item.image_url] } : {}),
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `http://localhost:5173/orders?orderId=${order.id}`, 
      cancel_url: 'http://localhost:5173/cart',
      metadata: {
        orderId: order.id,
        cartId: cartId,
        userId: userId,
      },
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating checkout session" });
  }
}; 

module.exports = { createCheckoutSession };
