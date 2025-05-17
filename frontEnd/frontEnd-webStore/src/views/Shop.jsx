import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useLocation } from "wouter";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer.jsx";
import SearchBox from "../components/SearchBox.jsx";
import PriceRangeSlider from "../components/PriceRangeSlider.jsx";
import ShopProductsGrid from "../components/ShopProductsGrid.jsx";
import SortBy from "../components/sortBy.jsx";

function Shop() {
  const [, setLocation] = useLocation();
  const [sortBy, setSortBy] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [paginationInfo, setPaginationInfo] = useState({
    start: 0,
    end: 0,
    total: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchApplied, setSearchApplied] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    if (category) {
      setSelectedCategory(category.toLowerCase());
      setFiltersApplied(true);
    }
  }, []);

  const handleFilter = () => {
    setFiltersApplied(true);
  };

  const handleSearch = () => {
    setSearchApplied(true);
    setFiltersApplied(true);
  };

  return (
    <>
      <div>
        <Navbar />
        <div>
          <div className="bg-gray-100 flex flex-col items-center justify-center py-10 gap-2">
            <div className="flex gap-4 text-sm md:text-base">
              <Link to="/">
                <p className="hover:text-blue-700">Home</p>
              </Link>
              <p>{">"}</p>
              <p>Shop</p>
            </div>

            <h1 className="text-2xl md:text-4xl font-bold">Shop</h1>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/4 p-4 space-y-8">
            <SearchBox
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSearch={handleSearch}
            />

            <div className="flex flex-col gap-4">
              <h1 className="text-lg font-semibold">Categories</h1>
              <ul className="space-y-1">
                {[
                  "all",
                  "accessories",
                  "gaming",
                  "headphones",
                  "laptops",
                  "smartphones",
                  "tvs",
                ].map((cat) => (
                  <li
                    key={cat}
                    onClick={() => { 
                      setSelectedCategory(cat);
                      setFiltersApplied(true);
                      setLocation(`/shop?category=${cat}`) 
                    }}
                    className={`cursor-pointer capitalize ${
                      selectedCategory === cat ? "font-bold text-red-600" : ""
                    }`}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            </div>

            <PriceRangeSlider
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
            />

            <div className="flex justify-center">
              <button
                type="button"
                className="py-2.5 px-6 text-base bg-red-600 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-300 hover:bg-red-800 w-full md:w-40"
                onClick={handleFilter}
              >
                Filter
              </button>
            </div>
          </div>

          <div className="w-full lg:w-3/4 p-4 space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-2">
              <div>
                <p className="text-4xl font-semibold">Products</p>
                <p>
                  Showing {paginationInfo.start}-{paginationInfo.end} of{" "}
                  {paginationInfo.total} results
                </p>
              </div>
              <SortBy sortBy={sortBy} setSortBy={setSortBy} />
            </div>

            <ShopProductsGrid
              minPrice={minPrice}
              maxPrice={maxPrice}
              selectedCategory={selectedCategory}
              filtersApplied={filtersApplied}
              sortBy={sortBy}
              onUpdatePaginationInfo={setPaginationInfo}
              searchQuery={searchQuery}
              searchApplied={searchApplied}
            />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Shop;
