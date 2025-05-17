import React from "react";
import CategoryCard from "./CategoryCard.jsx";

const categories = [
  {
    imageSrc: "../images/gaming_removed_bg.png",
    title: "Enjoy With",
    categoryName: "gaming",
    bgColor: "bg-gray-900",
    colSpan: "col-span-2",
  },
  {
    imageSrc: "../images/laptop_remove_bg.png",
    title: "Enjoy With",
    categoryName: "laptops",
    bgColor: "bg-orange-400",
    colSpan: "col-span-2",
  },
  {
    imageSrc: "../images/headphone_removed_bg.png",
    title: "Enjoy With",
    categoryName: "headphones",
    bgColor: "bg-blue-500",
    colSpan: "col-span-4",
  },
  {
    imageSrc: "../images/smartphone_removed_bg.png",
    title: "Enjoy With",
    categoryName: "smatphones",
    bgColor: "bg-green-500",
    colSpan: "col-span-4",
  },
  {
    imageSrc: "../images/accessories_image-removebg-preview.png",
    title: "Enjoy With",
    categoryName: "accessories",
    bgColor: "bg-yellow-300",
    colSpan: "col-span-2",
  },
  {
    imageSrc: "../images/tv2-removebg-preview.png",
    title: "Enjoy With",
    categoryName: "tvs",
    bgColor: "bg-pink-500",
    colSpan: "col-span-2",
  },
];

const CategoriesGrid = () => {
  return (
    <div className="max-w-full mx-auto px-4 py-10">
      <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-8 gap-6 my-8">
        {categories.map((category, index) => (
          <div key={index} className={`w-full ${category.colSpan}`}>
            <CategoryCard
              imageSrc={category.imageSrc}
              title={category.title}
              categoryName={category.categoryName}
              bgColor={category.bgColor}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesGrid;