import React, {useState} from 'react';
import axios from 'axios';
import {useAuth0} from '@auth0/auth0-react';

const AddBookForm = ({onBookAdded}: { onBookAdded: () => void }) => {
  const {getAccessTokenSilently} = useAuth0();

  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    categories: '',
    languages: '',
  });

  const [showForm, setShowForm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });
      console.log("Token:", token);


      await axios.post(
        'http://localhost:8000/books',
        {
          title: formData.title,
          authors: formData.authors.split(',').map(a => a.trim()),
          categories: formData.categories.split(',').map(c => c.trim()),
          languages: formData.languages.split(',').map(l => l.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onBookAdded(); // Refresh list
      setShowForm(false); // Hide form
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div className="mb-8">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Cancel' : 'Add Book'}
      </button>

      {showForm && (
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
          <input
            type="text"
            name="categories"
            placeholder="Categories (comma separated)"
            value={formData.categories}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-gray-300"
          />
          <input
            type="text"
            name="languages"
            placeholder="Languages (comma separated)"
            value={formData.languages}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-gray-300"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default AddBookForm;
