import { authHeaders } from "../auth/authHeaders";
const API_URL = "http://localhost:3000/api";


async function getCartItems(cartId) {
    try {
        const response = await fetch(`${API_URL}/cart-items/${cartId}`, {
        headers: authHeaders(),
      });
        if (!response.ok) throw new Error("Error fetching cart items");
        return await response.json();
      } catch (error) {
        console.error(error);
        throw error;
      }
    }

async function createCart(userId) {
    try {
      const res = await fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ user_id: userId }),
      });
      if (!res.ok) throw new Error("Error creating cart");

      const data = await res.json();
    return data;
    } catch (error) {
      console.error("Error creating cart:", error);
      throw error;
    }
  };

  async function getCartByUserId(userId) {
    try {
      const res = await fetch(`${API_URL}/cart/${userId}`,{
          headers: authHeaders(),
        }
      );
      
      if (!res.ok) {
        if (res.status === 404) {
          return null;
        }
        throw new Error(`Failed to fetch cart: ${res.statusText}`);
      }
  
      return  await res.json();
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw error;
    }
  }
  
async function addItemToCart(cartId, productId, quantity) {
  try {
   
        const res = await fetch(`${API_URL}/cart-items`, {
          method: "POST",
          headers: authHeaders(),
          body: JSON.stringify({ 
            cart_id: cartId, 
            product_id: productId, 
            quantity}),
        });
        if (!res.ok) throw new Error("Error adding item to cart");
        const data = await res.json();
    return data;
      } catch (error) {
        console.error("Error adding item to cart:", error);
        throw error;
      }
  };

async function updateCartItemQuantity(itemId, quantity) {
    try {
        const res = await fetch(`${API_URL}/cart-items/${itemId}`, {
          method: "PUT",
          headers: authHeaders(),
          body: JSON.stringify({ quantity }),
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Error updating item quantity");
      }
      
      return await res.json(); 
  } catch (error) {
      console.error("Error updating item quantity:", error);
      throw error;
  }
}

async function removeCartItem(itemId) {
  try {
      const res = await fetch(`${API_URL}/cart-items/${itemId}`, {
          method: "DELETE",
          headers: authHeaders(),
      });
      
      if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Error removing item from cart");
      }
      
      return await res.json(); 
  } catch (error) {
      console.error("Error removing item from cart:", error);
      throw error;
  }
}

    async function clearCart(cartId) {
      try {
        const res = await fetch(`${API_URL}/cart/${cartId}/clear`, {
          method: "DELETE",
          headers: authHeaders(),
        });
        if (!res.ok) throw new Error("Error clearing cart");
        const data = await res.json();
        return data;
      } catch (error) {
        console.error("Error clearing cart:", error);
        throw error;
      }
    }

async function getActiveCart(userId) {
      const response = await fetch(`${API_URL}/cart/active/${userId}`, {
          headers: authHeaders()
      });
      if (!response.ok) throw new Error("Error fetching cart");
      return await response.json();
  }
 
export default {
  getCartItems,
  createCart,
  getCartByUserId,
  addItemToCart,
  updateCartItemQuantity,
  removeCartItem,
  clearCart, 
  getActiveCart
};