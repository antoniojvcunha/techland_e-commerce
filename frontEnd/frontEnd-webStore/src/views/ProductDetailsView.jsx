import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import slugify from "../utils/slugify";
import shopProductService from "../services/shopProductService";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import BestSellersGrid from "../components/BestSellersGrid.jsx";
import { CartButton } from "../buttons/CartButton.jsx";

function ProductDetailsView() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const allProducts = await shopProductService.fetchAllProductsService();
        const matchedProduct = allProducts.find(
          (p) => slugify(p.name) === slug
        );
        setProduct(matchedProduct);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [slug]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
          <p className="text-lg text-gray-600">Loading product...</p>
        </div>
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-sm max-w-md mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h2 className="text-xl font-semibold text-gray-800 mt-4">
            Product not found
          </h2>
          <p className="text-gray-600 mt-2">
            The product you're looking for is not available
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to shop
          </Link>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-1/2 flex justify-center items-start">
          <div className="w-full max-w-md bg-gray-50 rounded-2xl p-6 shadow-sm">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-auto object-contain rounded-lg"
              style={{ maxHeight: "500px" }}
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col space-y-6">
          <div className="border-b border-gray-100 pb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>
            <div className="mt-4 flex items-center">
              <span className="text-2xl font-semibold text-yellow-600">
                {product.price} €
              </span>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700">
            <p className="text-lg leading-relaxed">{product.description}</p>
          </div>

          <div className="pt-4">
            <CartButton
              productId={product.id}
              variant="regular"
              className="w-full md:w-auto px-8 py-3 text-lg"
            />
          </div>
        </div>
      </div>

      <div>
        <BestSellersGrid />
      </div>

      <Footer />
    </div>
  );
}

export default ProductDetailsView;