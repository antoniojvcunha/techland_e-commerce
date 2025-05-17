import { authHeaders } from "../auth/authHeaders";
const API_BASE_URL = "http://localhost:3000/api";


async function completePurchase(cartId, orderId, token) {
  const response = await fetch(`${API_BASE_URL}/complete-purchase`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({ cartId, orderId }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to complete purchase");
  }

  return response.json();
}

async function updateOrderStatus(orderId, status, token) {
  const response = await fetch(`${API_BASE_URL}/orders/status`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify({ orderId, status }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update order status");
  }

  return response.json();
}

const orderService = {
  completePurchase,
  updateOrderStatus,
};

export default orderService;
