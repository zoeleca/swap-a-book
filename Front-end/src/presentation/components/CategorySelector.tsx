// CategorySelector.tsx
import React, {useState} from 'react';

interface CategorySelectorProps {
  categories: string[];
  selectedCategories: string[];
  onSelect: (category: string) => void;
  onRemove: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
                                                             categories,
                                                             selectedCategories,
                                                             onSelect,
                                                             onRemove,
                                                           }) => {
  const [categoryInput, setCategoryInput] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(categories);

  const handleCategoryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCategoryInput(value);
    setFilteredCategories(
      categories.filter((category) =>
        category.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <div className="relative w-full">
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedCategories.map((category) => (
          <div key={category} className="bg-amber-500 text-white px-3 py-1 rounded-full flex items-center">
            {category}
            <button
              type="button"
              onClick={() => onRemove(category)}
              className="ml-2 text-sm text-white"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      <input
        type="text"
        value={categoryInput}
        onChange={handleCategoryInputChange}
        placeholder="Type to select categories..."
        className="w-full px-3 py-2 rounded border border-gray-300"
      />

      {categoryInput && filteredCategories.length > 0 && (
        <ul
          className="absolute left-0 right-0 bg-white border border-gray-300 rounded-md shadow-md mt-1 z-20 max-h-40 overflow-auto">
          {filteredCategories.map((category) => (
            <li
              key={category}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => onSelect(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategorySelector;
