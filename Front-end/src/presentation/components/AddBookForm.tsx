// AddBookForm.tsx
import React, {useState} from 'react';
import axios from 'axios';
import {useAuth0} from '@auth0/auth0-react';
import CategorySelector from './CategorySelector';
import LanguageSelector from './LanguageSelector';

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

  const [formData, setFormData] = useState<FormData>({
    title: '',
    authors: '',
    categories: [],
    languages: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleCategorySelect = (category: string) => {
    if (!formData.categories.includes(category)) {
      setFormData((prev) => ({
        ...prev,
        categories: [...prev.categories, category],
      }));
    }
  };

  const handleLanguageSelect = (language: string) => {
    if (!formData.languages.includes(language)) {
      setFormData((prev) => ({
        ...prev,
        languages: [...prev.languages, language],
      }));
    }
  };

  const handleTagDelete = (tag: string, type: 'categories' | 'languages') => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((item) => item !== tag),
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

      onBookAdded();
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div className="mb-8">
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

        <CategorySelector
          categories={categories}
          selectedCategories={formData.categories}
          onSelect={handleCategorySelect}
          onRemove={(category) => handleTagDelete(category, 'categories')}
        />

        <LanguageSelector
          languages={languages}
          selectedLanguages={formData.languages}
          onSelect={handleLanguageSelect}
          onRemove={(language) => handleTagDelete(language, 'languages')}
        />

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
