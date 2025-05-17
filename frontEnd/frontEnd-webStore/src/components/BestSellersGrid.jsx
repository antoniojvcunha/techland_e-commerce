import { useEffect, useState } from "react";
import BestSellerCard from "./ProductCard";
import fetchBestSellers from "../services/bestSellerService";

function BestSellersGrid() {
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBestSellers() {
      try {
        const bestSellers = await fetchBestSellers();
        setBestSellers(bestSellers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching best sellers:", error);
        setLoading(false);
      }
    }

    loadBestSellers();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading best sellers...</div>;
  }

  if (bestSellers.length === 0) {
    return <div className="text-center py-10">No best sellers found</div>;
  }

  return (
    <div className="max-w-full mx-auto px-4 py-10 bg-gray-50">
      <div className="flex items-center justify-center text-5xl">
        Best Sellers
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 py-10">
        {bestSellers.map((product) => (
          <BestSellerCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default BestSellersGrid;

