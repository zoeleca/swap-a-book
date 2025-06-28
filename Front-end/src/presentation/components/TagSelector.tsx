import React, { useState } from "react";

interface TagSelectorProps {
  label: string;
  tags: string[];
  onAdd: (tag: string) => void;
  onRemove: (tag: string) => void;
  suggestions?: string[]; // optional for dropdown suggestions
}

const TagSelector: React.FC<TagSelectorProps> = ({ label, tags, onAdd, onRemove, suggestions = [] }) => {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onAdd(trimmed);
      setInputValue("");
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>

      <div className="flex gap-2 flex-wrap mb-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center bg-amber-200 text-amber-800 rounded-full px-3 py-1 text-sm"
          >
            {tag}
            <button
              type="button"
              className="ml-2 text-amber-600 hover:text-amber-800"
              onClick={() => onRemove(tag)}
            >
              &times;
            </button>
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd();
            }
          }}
          placeholder={`Add a ${label.toLowerCase().slice(0, -1)}`}
          className="flex-1 px-3 py-2 border border-gray-300 rounded"
        />

        <button
          type="button"
          onClick={handleAdd}
          className="bg-amber-700 text-white px-4 py-2 rounded hover:bg-amber-900 transition"
        >
          Add
        </button>
      </div>

      {suggestions.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onAdd(s)}
              className="bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-sm hover:bg-gray-300"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagSelector;
