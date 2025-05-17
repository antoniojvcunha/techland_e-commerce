import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CheckoutButton = ({ cartItems, cartId, userId }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You need to be authenticated to complete your purchase.");
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cartId,
          userId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.url) {
          window.location.href = data.url;
        } else {
          navigate("/orders");
        }
      } else {
        setError(data.message || "Error creating checkout session.");
      }
    } catch (error) {
      setError("An error occurred while processing your order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="bg-blue-600 cursor-pointer text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 hover:scale-120 transition-colors duration-200 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Checkout"}
      </button>
    </div>
  );
};

export default CheckoutButton;