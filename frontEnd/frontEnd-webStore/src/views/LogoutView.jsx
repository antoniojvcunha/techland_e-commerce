import { useAuth } from "../auth/useAuth";
import { useLocation } from "wouter";
import { useCart } from "../context/cart/useCart";

function LogoutButton() {
  const { logout } = useAuth();
  const [, navigate] = useLocation();
  const { clearCart } = useCart();


  function handleLogout() {
    clearCart();
    logout();       
    navigate("/");   
  }

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer w-full hover:bg-red-600">
      Logout
    </button>
  );
}

export default LogoutButton;
