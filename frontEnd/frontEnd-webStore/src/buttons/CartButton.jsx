import { useState, useEffect } from "react";
import { useCart } from "../context/cart/useCart";
import { ShoppingCart } from "lucide-react";

export const CartButton = ({ productId, variant = "floating", children }) => {
  const { addToCart, loading, cartId, error } = useCart();
  const [buttonState, setButtonState] = useState({
    text: "Add to Cart",
    isDisabled: false,
    className: "bg-red-500 hover:bg-red-600"
  });

  useEffect(() => {
    if (error) {
      setButtonState({
        text: "Error! Try again",
        isDisabled: false,
        className: "bg-yellow-500 hover:bg-yellow-600"
      });
    }
  }, [error]);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setButtonState({
      text: "Adding...",
      isDisabled: true,
      className: "bg-gray-400"
    });

    try {
      if (!cartId) {
        setButtonState({
          text: "Preparing cart...",
          isDisabled: true,
          className: "bg-gray-400"
        });
        return;
      }

      await addToCart(productId, 1);

      setButtonState({
        text: "✓",
        isDisabled: false,
        className: "bg-green-500 hover:bg-green-600"
      });

      setTimeout(() => {
        setButtonState({
          text: "Add to Cart",
          isDisabled: false,
          className: "bg-red-500 hover:bg-red-600"
        });
      }, 1500);

    } catch (error) {
      console.error("Error adding to cart:", error);
      setButtonState({
        text: "Failed! Try again",
        isDisabled: false,
        className: "bg-yellow-500 hover:bg-yellow-600"
      });
    }
  };

  const baseStyles = `
    transition-all duration-300 hover:scale-105
    ${buttonState.className}
  `;

  if (variant === "floating") {
    return (
      <button
        onClick={handleAddToCart}
        disabled={buttonState.isDisabled || loading}
        className={`
          absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          opacity-0 group-hover:opacity-100 z-20 cursor-pointer
          w-12 h-12 rounded-full flex items-center justify-center text-white
          shadow-md
          ${baseStyles}
        `}
        aria-label={buttonState.text}
        title={buttonState.text}
      >
        {buttonState.text === "✓" ? (
          <span className="text-xl font-bold">✓</span>
        ) : buttonState.text === "Adding..." || buttonState.text === "Preparing cart..." ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
            ></path>
          </svg>
        ) : (
          <ShoppingCart size={20} />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={buttonState.isDisabled || loading}
      className={`
        w-full py-3 px-6 rounded-full text-white font-medium
        ${baseStyles}
      `}
    >
      {children || buttonState.text}
    </button>
  );
};
