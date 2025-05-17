import { useEffect, useState, useCallback } from "react";
import { CartContext } from "./CartContext";
import cartService from "../../services/cartService";

function CartProvider({ userId, children }) {
  const [cartId, setCartId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshCartItems = useCallback(async (id) => {
    if (!id) return;
    try {
      const items = await cartService.getCartItems(id);
      setCartItems(items);
      setError(null);
      return items; 
    } catch (err) {
      console.error("Error loading cart items:", err);
      setError("Failed to load cart items");
      throw err; 
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function initCart() {
      if (!userId) {
        if (isMounted) {
          setCartId(null);
          setCartItems([]);
          setLoading(false);
        }
        return;
      }

      try {
        setLoading(true);
        
        const cart = await cartService.getCartByUserId(userId) || 
                     await cartService.createCart(userId);
        
        if (!isMounted) return;

        setCartId(cart.id);
        
        const items = await refreshCartItems(cart.id);
        if (!isMounted) return;

        if (!items) {
          console.warn("No items returned for cart:", cart.id);
          setCartItems([]);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error initializing cart:", err);
          setError("Failed to initialize cart");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    initCart();

    return () => {
      isMounted = false;
    };
  }, [userId, refreshCartItems]);

  const cartActionWrapper = async (action, ...args) => {
    if (loading || !cartId) return;
    
    try {
      setLoading(true);
      await action(...args);
      await refreshCartItems(cartId);
    } catch (err) {
      console.error("Cart action error:", err);
      setError(`Failed to execute ${action.name}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (productId, quantity = 1) => 
    cartActionWrapper(cartService.addItemToCart, cartId, productId, quantity);

  const updateQuantity = async (itemId, quantity) => {
    try {
      setLoading(true);
      await cartService.updateCartItemQuantity(itemId, quantity);
      setCartItems(prev => prev.map(item => 
        item.cart_item_id === itemId ? { ...item, quantity } : item
      ));
    } catch (error) {
      console.error("Error updating quantity:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      setLoading(true);
      await cartService.removeCartItem(itemId);
      setCartItems(prev => prev.filter(item => item.cart_item_id !== itemId));
    } catch (error) {
      console.error("Error removing item:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      await cartService.clearCart(cartId);
      setCartItems([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw error;
    }
  };

  const resetCart = () => {
    localStorage.removeItem("cartId");
    setCartId(null);
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartId,
        cartItems,
        loading,
        error,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        resetCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartProvider };