import { useEffect, useState } from "react";
import { Link } from "wouter";
import slugify from "../utils/slugify";
import fetchNovelties from "../services/noveltieService";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

function HeroSlider() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNovelties() {
      try {
        const novelties = await fetchNovelties();
        setProducts(novelties);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching novelties:", error);
        setLoading(false);
      }
    }

    loadNovelties();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading novelties...</div>;
  }

  if (products.length === 0) {
    return <div className="text-center py-10">No novelties available</div>;
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      loop
      className="w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] xl:h-[600px]"
    >
      {Array.isArray(products) &&
        products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="flex flex-col md:flex-row items-center justify-between h-full px-6 sm:px-10 py-6 rounded-xl bg-gradient-to-r from-red-100 via-white to-white">
              {/* Texto */}
              <div className="flex flex-col max-w-full md:max-w-md ml-0 md:ml-20 text-center md:text-left">
                <span className="text-base sm:text-lg font-medium mb-2">
                  {product.description}
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
                  {product.name} <br />
                  <span className="text-gray-600 text-lg sm:text-xl">
                    {product.price}€
                  </span>
                </h1>
                <Link to={`/shop/product/${slugify(product.name)}`}>
                  <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg w-max mx-auto md:mx-0 cursor-pointer transition-colors duration-300">
                    Shop Now
                  </button>
                </Link>
              </div>

              <div className="mt-6 md:mt-0 md:mr-20 flex-shrink-0">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-48 sm:w-64 md:w-72 lg:w-80 xl:w-96 object-contain drop-shadow-lg mx-auto"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}

export default HeroSlider;
