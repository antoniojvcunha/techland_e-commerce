import { authHeaders } from "../auth/authHeaders";
const API_URL = "http://localhost:3000/api";

const createCheckoutSession = async ({ cartId, userId}) => {
  const response = await fetch(`${API_URL}/checkout`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ cartId, userId }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error creating checkout session.");
  }

  return data;
};

export default createCheckoutSession;
