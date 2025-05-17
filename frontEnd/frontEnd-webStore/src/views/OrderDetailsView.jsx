import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import orderService from "../services/orderService"; // não esqueça de importar

function OrderDetails() {
  const [, params] = useRoute("/orders/:id");
  const id = params?.id;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function getOrderDetails() {
      try {
        setLoading(true);
        const data = await orderService.fetchOrderDetails(id);
        setOrder(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    getOrderDetails();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading order details...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">Error: {error}</div>;
  if (!order) return <div className="text-center mt-10">Order not found.</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-4 sm:p-6 border-b">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              Order #{order.id}
            </h1>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-sm sm:text-base text-gray-600">
              <p>
                <span className="font-medium">Date:</span> {new Date(order.created_at).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-6 border-b">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Order Summary</h2>
            <div className="space-y-3 sm:space-y-4">
              {order.items?.length > 0 ? (
                order.items.map((item) => (
                  <div
                    key={`${item.product_id}-${item.quantity}`}
                    className="flex flex-col sm:flex-row items-start sm:items-center p-3 hover:bg-gray-50 rounded-lg transition-colors gap-3 sm:gap-4"
                  >
                    <img
                      src={item.image_url || '/placeholder-product.jpg'}
                      alt={item.name}
                      className="w-full sm:w-16 h-auto sm:h-16 object-contain rounded sm:mr-4 border"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder-product.jpg';
                      }}
                    />
                    <div className="flex-1 w-full">
                      <h3 className="text-base sm:text-lg font-medium text-gray-800">{item.name || 'Unnamed Product'}</h3>
                      <div className="flex flex-col sm:flex-row sm:gap-4 text-xs sm:text-sm text-gray-500 mt-1">
                        <p>Unit price: €{Number(item.price_unit || 0).toFixed(2)}</p>
                        <p>Qty: {item.quantity || 1}</p>
                      </div>
                    </div>
                    <div className="text-right font-semibold text-blue-600 text-base sm:text-lg w-full sm:w-auto">
                      €{((item.price_unit || 0) * (item.quantity || 1)).toFixed(2)}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No items in this order</p>
              )}
            </div>
          </div>

          <div className="p-4 sm:p-6 bg-gray-50">
            <div className="flex justify-center items-center">
              <div className="text-right flex flex-col items-center justify-center gap-3">
                <p className="text-sm sm:text-base text-gray-600">Order Total:</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-600">
                  €{Number(order.total_price || 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default OrderDetails;
