import { authHeaders } from "../auth/authHeaders";

const API_URL = "http://localhost:3000/api";

async function fetchOrderDetails(id) {
  try {
    const response = await fetch(`${API_URL}/orders/${id}/details`, {
      headers: authHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Error fetching order details: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
}

// Exemplo de outras funções que você possa querer colocar no mesmo service:
async function fetchOrders() {
  try {
    const response = await fetch(`${API_URL}/orders`, {
      headers: authHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Error fetching orders: ${response.statusText}`);
    }
    const data = await response.json();
    // Ordena do mais recente para o mais antigo
    return data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

async function updateOrderStatus(orderId, status = "completed") {
  try {
    const response = await fetch(`${API_URL}/orders/status`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify({ orderId, status }),
    });

    if (!response.ok) {
      throw new Error("Failed to update status");
    }

    return true;
  } catch (error) {
    console.error("Error updating status:", error);
    return false;
  }
}


export default {
  fetchOrderDetails,
  fetchOrders,
  updateOrderStatus
};
