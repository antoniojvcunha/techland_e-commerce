import { useCart } from "../context/cart/useCart";
import { useAuth } from "../auth/useAuth";
import { Link } from "wouter";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import Footer from "../components/Footer";
import CheckoutButton from "../components/CheckoutButton";

function CartView() {
  const { cartItems, updateQuantity, removeFromCart, loading, cartId } = useCart();
  const { user } = useAuth();

  const handleQuantityChange = (item, newQuantity) => {
    const quantity = parseInt(newQuantity);
    if (quantity < 1 || isNaN(quantity)) return;
    if (!item.cart_item_id) return;
    updateQuantity(item.cart_item_id, quantity);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * item.quantity,
    0
  );

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-gray-200 h-12 w-12"></div>
      </div>
      <p className="mt-4 text-gray-600">Loading your cart...</p>
    </div>
  );

  if (cartItems.length === 0) return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Breadcrumb currentPage="Cart" />
      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
        <div className="max-w-md space-y-4">
          <div className="mx-auto h-24 w-24 text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">Your cart is empty</h3>
          <p className="text-gray-500">Start adding some products to see them here!</p>
          <Link 
            to="/shop"
            className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <Breadcrumb currentPage="Cart" />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="space-y-4">
            {cartItems.map((item) => {
              const price = Number(item.price) || 0;
              return (
                <div 
                  key={item.product_id || item.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-200"
                >
                  <div className="flex flex-col sm:flex-row items-center p-4 gap-4">
                    <div className="w-full sm:w-1/6 flex justify-center">
                      <div className="w-20 h-20 flex items-center justify-center bg-gray-50 p-2 rounded">
                        <img
                          src={item.image_url || item.image}
                          alt={item.name}
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTQgNWgxNmExIDEgMCAwIDEgMSAxdjEyYTEgMSAwIDAgMS0xIDFINGExIDEgMCAwIDEtMS0xVjZhMSAxIDAgMCAxIDEtMXptMTYgMkg0djEyaDE2Vjd6IiBmaWxsPSIjZTBlMGUwIi8+PC9zdmc+';
                          }}
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-2/6 px-2 text-center sm:text-left">
                      <p className="font-medium text-gray-800 line-clamp-2">
                        {item.name || `Product ${item.product_id}`}
                      </p>
                    </div>

                    <div className="w-full sm:w-1/6 text-center">
                      <p className="text-base font-medium text-blue-600">
                        {price.toFixed(2)}€
                      </p>
                    </div>

                    <div className="w-full sm:w-1/6">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item, e.target.value)}
                        className="w-full max-w-[80px] mx-auto px-2 py-1 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="w-full sm:w-1/6 text-center sm:text-right">
                      <button
                        onClick={() => item.cart_item_id && removeFromCart(item.cart_item_id)}
                        className="px-3 py-1 flex items-center gap-1 mx-auto sm:ml-auto bg-white text-red-500 rounded-md hover:bg-red-50 transition-colors font-medium"
                        disabled={loading}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        {loading ? "..." : "Remove"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="text-right mt-8 p-4 bg-white rounded-lg border border-gray-200">
              <div className="font-bold text-xl text-gray-800 mb-4">
                Total: <span className="text-blue-600">{totalPrice.toFixed(2)}€</span>
              </div>
              
              {user ? (
                <CheckoutButton
                  cartItems={cartItems}
                  cartId={cartId}
                  userId={user.id}
                  className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                />
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-red-600 font-medium">
                    You need to be logged in to checkout.
                  </p>
                  <Link 
                    to="/login"
                    className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Login Now
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CartView;