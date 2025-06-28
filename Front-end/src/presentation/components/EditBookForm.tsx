import React, { useState } from "react";
import { Book } from "../../domain/models/Book";
import { useAuth0 } from "@auth0/auth0-react";
import { z } from "zod";
import axios from "axios";
import CategorySelector from "../components/CategorySelector";
import LanguageSelector from "../components/LanguageSelector";

interface Props {
  book: Book;
  onSave: () => void;
  onCancel?: () => void;
}

const bookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  authors: z.array(z.string()).nonempty('At least one author is required'),
  categories: z.array(z.string()).nonempty('Select at least one category'),
  languages: z.array(z.string()).nonempty('Select at least one language'),
  description: z.string().optional(),
});

type FormData = {
  title: string;
  authors: string[];
  categories: string[];
  languages: string[];
  description?: string;
};

const EditBookForm: React.FC<Props> = ({ book, onSave, onCancel }) => {
  const [formData, setFormData] = useState<FormData>({
    title: book.title || "",
    authors: Array.isArray(book.authors) ? book.authors : (book.authors ? [book.authors] : []),
    description: book.description || "",
    categories: Array.isArray(book.categories) ? book.categories : [],
    languages: Array.isArray(book.languages) ? book.languages : [],
  });

  const { getAccessTokenSilently } = useAuth0();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validated = bookSchema.parse(formData);
      const token = await getAccessTokenSilently({
        authorizationParams: { audience: import.meta.env.VITE_AUTH0_AUDIENCE },
      });

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/books/${book.id}`,
        validated,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onSave();
    } catch (err) {
      console.error("Failed to update book", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-800">Edit Book</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
          className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2"
        />
      </div>

      <div className="relative">
        <CategorySelector
          categories={["Fiction", "Fantasy", "Mystery", "Adventure", "Novel", "Crime"]} // example list
          selectedCategories={formData.categories}
          onSelect={(category) =>
            setFormData((prev) => ({
              ...prev,
              categories: prev.categories.includes(category) ? prev.categories : [...prev.categories, category],
            }))
          }
          onRemove={(category) =>
            setFormData((prev) => ({
              ...prev,
              categories: prev.categories.filter((c) => c !== category),
            }))
          }
        />
      </div>

      <div className="relative">
        <LanguageSelector
          languages={[
            "English", "French", "Spanish", "German", "Chinese", "Hindi", "Portuguese", "Russian",
          ]}
          selectedLanguages={formData.languages}
          onSelect={(language) =>
            setFormData((prev) => ({
              ...prev,
              languages: prev.languages.includes(language) ? prev.languages : [...prev.languages, language],
            }))
          }
          onRemove={(language) =>
            setFormData((prev) => ({
              ...prev,
              languages: prev.languages.filter((l) => l !== language),
            }))
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Authors</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.authors.map((author) => (
            <span
              key={author}
              className="inline-flex items-center bg-amber-200 text-amber-800 rounded-full px-3 py-1 text-sm"
            >
              {author}
              <button
                type="button"
                className="ml-2 text-amber-600 hover:text-amber-800"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    authors: prev.authors.filter((a) => a !== author),
                  }))
                }
              >
                &times;
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          placeholder="Add author and press Enter"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const value = e.currentTarget.value.trim();
              if (value && !formData.authors.includes(value)) {
                setFormData((prev) => ({
                  ...prev,
                  authors: [...prev.authors, value],
                }));
                e.currentTarget.value = "";
              }
            }
          }}
          className="w-full px-3 py-2 rounded border border-gray-300"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          rows={4}
          className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2"
        />
      </div>

      <div className="pt-4 flex gap-3">
        <button
          type="submit"
          className="bg-amber-700 hover:bg-amber-950 text-white px-5 py-2 rounded-lg font-semibold transition"
        >
          Save
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-amber-600 hover:text-amber-800 underline"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default EditBookForm;
