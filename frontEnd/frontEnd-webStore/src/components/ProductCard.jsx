import { Link } from "wouter";
import slugify from "../utils/slugify";
import { CartButton } from "../buttons/CartButton";

function ProductCard({ product }) {
  return (
    <div className="relative bg-white border border-gray-200 rounded-2xl shadow-sm group transition-all duration-300 hover:shadow-lg hover:scale-[1.02] overflow-hidden">
      <Link to={`/shop/product/${slugify(product.name)}`}>
        <div className="relative w-full h-56 bg-white overflow-hidden">
          <img
            src={product.image_url || null}
            alt={product.name}
            className="w-full h-full object-contain transition-all duration-500 ease-in-out group-hover:blur-sm group-hover:scale-105"
          />
        </div>

        <div className="p-5 text-center">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {product.name}
          </h2>
          <p className="text-xl font-bold text-indigo-600 mt-2">
            {product.price.toLocaleString()}€
          </p>
        </div>
      </Link>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <CartButton
          productId={product.id}
          variant="floating"
          className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg hover:bg-indigo-700 transition"
        />
      </div>
    </div>
  );
}

export default ProductCard;
