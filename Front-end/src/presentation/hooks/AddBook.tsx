import React, {useState} from 'react';
import axios from 'axios';
import {useAuth0} from '@auth0/auth0-react';

const categories = ["Fiction", "Fantasy", "ChildrenStory", "Adventure", "Novel", "Mystery", "Crime", "Detective"];
const languages = ["English", "Chinese", "Hindi", "Spanish", "French", "Arabic", "Bengali", "Portuguese", "Russian", "Urdu", "Indonesian", "German", "Japanese", "Swahili", "Marathi", "Telugu", "Turkish", "Korean", "Tamil", "Vietnamese"];

interface FormData {
  title: string;
  authors: string;
  categories: string[];
  languages: string[];
}

const AddBookForm = ({onBookAdded}: { onBookAdded: () => void }) => {
  const {getAccessTokenSilently} = useAuth0();

  // Explicitly type the state
  const [formData, setFormData] = useState<FormData>({
    title: '',
    authors: '',
    categories: [],
    languages: [],
  });

  const [categoryInput, setCategoryInput] = useState('');
  const [languageInput, setLanguageInput] = useState('');

  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [filteredLanguages, setFilteredLanguages] = useState(languages);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleCategoryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCategoryInput(value);

    // Filter categories based on the input
    setFilteredCategories(categories.filter((category) => category.toLowerCase().includes(value.toLowerCase())));
  };

  const handleLanguageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLanguageInput(value);

    // Filter languages based on the input
    setFilteredLanguages(languages.filter((language) => language.toLowerCase().includes(value.toLowerCase())));
  };

  const handleCategorySelect = (category: string) => {
    if (!formData.categories.includes(category)) {
      setFormData((prev) => ({
        ...prev,
        categories: [...prev.categories, category],
      }));
    }
    setCategoryInput('');
    setFilteredCategories(categories); // reset filter
  };

  const handleLanguageSelect = (language: string) => {
    if (!formData.languages.includes(language)) {
      setFormData((prev) => ({
        ...prev,
        languages: [...prev.languages, language],
      }));
    }
    setLanguageInput('');
    setFilteredLanguages(languages); // reset filter
  };

  const handleTagDelete = (tag: string, type: 'categories' | 'languages') => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((item: string) => item !== tag),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });
      console.log('Token:', token);

      await axios.post(
        'http://localhost:8000/books',
        {
          title: formData.title,
          authors: formData.authors.split(',').map((a) => a.trim()),
          categories: formData.categories,
          languages: formData.languages,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onBookAdded(); // Refresh list
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div className="mb-8">
      <button
        className="bg-amber-800 text-white px-4 py-2 rounded-md hover:bg-amber-900 transition"
        onClick={() => setCategoryInput('')}
      >
        Add Book
      </button>

      <form onSubmit={handleSubmit} className="mt-4 bg-gray-100 p-6 rounded-lg shadow-md space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 rounded border border-gray-300"
        />
        <input
          type="text"
          name="authors"
          placeholder="Authors (comma separated)"
          value={formData.authors}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded border border-gray-300"
        />

        {/* Categories */}
        <div className="relative w-full">
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.categories.map((category) => (
              <div key={category} className="bg-amber-500 text-white px-3 py-1 rounded-full flex items-center">
                {category}
                <button
                  type="button"
                  onClick={() => handleTagDelete(category, 'categories')}
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
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          )}
        </div>


        {/* Languages */}
        <div className="flex flex-wrap gap-2">
          {formData.languages.map((language) => (
            <div key={language} className="bg-amber-500 text-white px-3 py-1 rounded-full flex items-center">
              {language}
              <button
                type="button"
                onClick={() => handleTagDelete(language, 'languages')}
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
                  onClick={() => handleLanguageSelect(language)}
                >
                  {language}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-amber-800 text-white px-4 py-2 rounded-md hover:bg-amber-900 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;
