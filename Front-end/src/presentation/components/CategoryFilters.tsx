import React from "react";

interface Props {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CategoryFilter: React.FC<Props> = ({categories, selectedCategory, onSelectCategory}) => {
  return (
    <div className="py-12 flex flex-wrap gap-3 mb-6">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-4 py-1 rounded-full border ${
          selectedCategory === null ? "bg-amber-900 text-white" : "text-amber-900 border-amber-900"
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-1 rounded-full border ${
            selectedCategory === category ? "bg-amber-900 text-white" : "text-amber-900 border-amber-900"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
