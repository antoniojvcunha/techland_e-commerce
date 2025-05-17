import { Link } from 'wouter';

const CategoryCard = ({ imageSrc, categoryName, bgColor, colSpan}) => {
  return (
    <div className={`relative ${bgColor} ${colSpan} p-6 rounded-3xl overflow-hidden flex items-center transition-all duration-300 hover:scale-105`}>
      
      <h1 className="absolute top-12 left-6 text-5xl font-extrabold text-gray-700 opacity-40 z-0 capitalize">
        {categoryName}
      </h1>

      <div className="flex justify-center z-10 mt-4">
        <img src={imageSrc} alt={categoryName} className="h-40 object-contain" />
      </div>

      <div className="absolute bottom-6 right-6 z-10 ">
        <Link to={`/shop?category=${categoryName}`}>
          <button className="hover:scale-105 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full cursor-pointer transition-all duration-300">
            Browse
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
