import React, { useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { z } from 'zod';
import CategorySelector from './CategorySelector';
import LanguageSelector from './LanguageSelector';
import { UseGoogleBooksSearch } from '../hooks/UseGoogleBooksSearch';
import { getLanguageName, normalizeCategory } from "../utils/GoogleBooksHelpers.ts";

const categories = ["Fiction", "Fantasy", "ChildrenStory", "Adventure", "Novel", "Mystery", "Crime", "Detective"];
const languages = ["English", "Chinese", "Hindi", "Spanish", "French", "Arabic", "Bengali", "Portuguese", "Russian", "Urdu", "Indonesian", "German", "Japanese", "Swahili", "Marathi", "Telugu", "Turkish", "Korean", "Tamil", "Vietnamese"];

const bookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  authors: z.string().min(1, 'At least one author is required'),
  categories: z.array(z.string()).nonempty('Select at least one category'),
  languages: z.array(z.string()).nonempty('Select at least one language'),
  description: z.string().optional(),
});

type FormData = {
  title: string;
  authors: string;
  categories: string[];
  languages: string[];
  coverImage?: string;
  description?: string;
};

const AddBookForm = ({ onBookAdded }: { onBookAdded: () => void }) => {
  const { getAccessTokenSilently } = useAuth0();

  const [formData, setFormData] = useState<FormData>({
    title: '',
    authors: '',
    categories: [],
    languages: [],
    description: '',
  });

  const [errors, setErrors] = useState<{ path: string; message: string }[]>([]);
  const [titleInput, setTitleInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const googleResults = UseGoogleBooksSearch(titleInput);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    setErrors([]);

    try {
      const validated = bookSchema.parse(formData);
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });

      await axios.post(
        `${import.meta.env.VITE_API_URL}/books`,
        {
          title: validated.title,
          authors: validated.authors.split(',').map((a) => a.trim()),
          categories: validated.categories,
          languages: validated.languages,
          coverImage: formData.coverImage || null,
          description: formData.description || null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onBookAdded();
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.errors.map((err) => ({
          path: err.path[0]?.toString() || '',
          message: err.message,
        })));
      } else {
        console.error('Error adding book:', error);
      }
    }
  };

  return (
    <div className="mb-8 mt-8 px-4">
      <form onSubmit={handleSubmit} className="mt-4 bg-gray-100 p-6 rounded-lg shadow-md space-y-4 relative">

        {/* Title input */}
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={titleInput}
          onChange={(e) => {
            const value = e.target.value;
            setTitleInput(value);
            setFormData((prev) => ({ ...prev, title: value }));
            setShowSuggestions(true);
          }}
          className="w-full px-3 py-2 rounded border border-gray-300"
        />

        {titleInput && showSuggestions && googleResults.length > 0 && (
          <div className="absolute bg-white border rounded shadow-md mt-1 z-10 w-full max-h-60 overflow-y-auto">
            {googleResults.map((book) => (
              <div
                key={book.id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  const normalizedCategories = book.categories
                    .map((c) => normalizeCategory(c))
                    .filter((c): c is string => !!c);

                  const languageName = getLanguageName(book.language);

                  setFormData((prev) => ({
                    ...prev,
                    title: book.title,
                    authors: book.authors.join(", "),
                    categories: normalizedCategories.length ? normalizedCategories : prev.categories,
                    languages: languageName ? [languageName] : prev.languages,
                    coverImage: book.thumbnail || "",
                    description: book.description || "",
                  }));

                  setTitleInput(book.title);
                  setShowSuggestions(false);
                }}
              >
                <strong>{book.title}</strong>
                <div className="text-sm text-gray-500">{book.authors?.join(", ")}</div>
              </div>
            ))}
          </div>
        )}

        <input
          type="text"
          name="authors"
          placeholder="Authors (comma separated)"
          value={formData.authors}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded border border-gray-300"
        />

        {errors.map((err, idx) => (
          <p key={idx} className="text-red-500 text-sm">{err.message}</p>
        ))}

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

        {/* ✅ Description Textarea */}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded border border-gray-300 h-24 resize-none"
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
