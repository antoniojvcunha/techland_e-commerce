import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "wouter";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import Footer from "../components/Footer";
import orderService from "../services/orderService";

function OrderView() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchOrders = async () => {
    try {
      const data = await orderService.fetchOrders();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId) => {
    const success = await orderService.updateOrderStatus(orderId);
    return success;
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get("orderId");

    if (orderId) {
      updateOrderStatus(orderId).then((success) => {
        if (success) {
          fetchOrders();
          navigate("/orders", { replace: true });
        }
      });
    } else {
      fetchOrders();
    }
  }, [location.search, navigate]);

  if (loading) return <div className="text-center py-10">Loading orders...</div>;

  return (
    <>
      <Navbar />
      <Breadcrumb currentPage="My Orders" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Order History</h1>

        {orders.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            You don't have any orders yet.
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-200 rounded-lg shadow-sm bg-white p-3 sm:p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-2">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                      Order #{order.id}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleString()}
                    </p>
                  </div>
                  <span
                    className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full ${
                      order.status === "completed"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>

                <div className="space-y-2 mb-3 sm:mb-4">
                  {order.items?.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center border rounded-md p-2 hover:bg-gray-50 gap-2 sm:gap-4"
                    >
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-full sm:w-16 h-auto sm:h-16 object-cover rounded border"
                      />
                      <div className="flex-1 w-full">
                        <p className="font-medium text-gray-700 text-sm sm:text-base">
                          {item.product.name}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right font-semibold text-blue-600 text-sm sm:text-base w-full sm:w-auto">
                        €{(item.quantity * item.product.price).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t pt-3 sm:pt-4 gap-2">
                  <Link
                    to={`/orders/${order.id}`}
                    className="text-xs sm:text-sm text-blue-600 hover:underline hover:text-blue-700"
                  >
                    View order details
                  </Link>
                  <div className="text-right">
                    <span className="text-gray-600 text-xs sm:text-sm mr-2">Order Total:</span>
                    <span className="text-lg sm:text-xl font-bold text-blue-600">
                      €{Number(order.total_price).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default OrderView;
