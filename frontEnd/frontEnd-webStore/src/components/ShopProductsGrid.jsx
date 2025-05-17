import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import shopProductService from "../services/shopProductService";
import Pagination from "./Pagination";

function ShopProductsGrid({
  minPrice,
  maxPrice,
  selectedCategory,
  filtersApplied,
  sortBy,
  onUpdatePaginationInfo,
  searchQuery,
  searchApplied,
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);

        let fetchedProducts;
        if (!filtersApplied || selectedCategory === "all") {
          fetchedProducts = await shopProductService.fetchAllProductsService();
        } else {
          fetchedProducts =
            await shopProductService.fetchProductsByCategoryService(
              selectedCategory
            );
        }

        setProducts(fetchedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    }

    fetchProducts();
  }, [selectedCategory, filtersApplied]);

  useEffect(() => {
    let result = products.filter(
      (p) => p.price >= minPrice && p.price <= maxPrice
    );

    if (searchApplied && searchQuery.trim() !== "") {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(query));
    }

    if (sortBy === "A-Z") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "Z-A") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === "ASC") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "DESC") {
      result.sort((a, b) => b.price - a.price);
    }

    setFiltered(result);
    setCurrentPage(1);
  }, [products, minPrice, maxPrice, sortBy, searchQuery, searchApplied]);

  useEffect(() => {
    const total = filtered.length;
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, total);

    if (onUpdatePaginationInfo) {
      onUpdatePaginationInfo({ start, end, total });
    }
  }, [filtered, currentPage, onUpdatePaginationInfo]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (filtered.length === 0) {
    return <div className="text-center py-10">No products found</div>;
  }

  return (
    <>
      <div className="max-w-full mx-auto px-4 py-">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-10 my-8">
          {currentItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
}

export default ShopProductsGrid;
