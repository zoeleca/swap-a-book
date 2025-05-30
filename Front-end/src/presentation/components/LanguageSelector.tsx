// LanguageSelector.tsx
import React, { useState } from 'react';

interface LanguageSelectorProps {
  languages: string[];
  selectedLanguages: string[];
  onSelect: (language: string) => void;
  onRemove: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
                                                             languages,
                                                             selectedLanguages,
                                                             onSelect,
                                                             onRemove,
                                                           }) => {
  const [languageInput, setLanguageInput] = useState('');
  const [filteredLanguages, setFilteredLanguages] = useState(languages);

  const handleLanguageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLanguageInput(value);
    setFilteredLanguages(
      languages.filter((language) =>
        language.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      {selectedLanguages.map((language) => (
        <div key={language} className="bg-amber-500 text-white px-3 py-1 rounded-full flex items-center">
          {language}
          <button
            type="button"
            onClick={() => onRemove(language)}
            className="ml-2 text-sm text-white"
          >
            &times;
          </button>
        </div>
      ))}
      <input
        type="text"
        value={languageInput}
        onChange={handleLanguageInputChange}
        placeholder="Select Languages"
        className="w-full px-3 py-2 rounded border border-gray-300"
      />
      {languageInput && (
        <div className="absolute bg-white border rounded-md shadow-lg mt-2 z-10 w-full">
          {filteredLanguages.map((language) => (
            <div
              key={language}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onSelect(language);
                setLanguageInput(""); // ✅ closes the dropdown
              }}
            >
              {language}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
