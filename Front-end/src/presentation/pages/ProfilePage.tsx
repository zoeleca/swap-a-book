import React, {useEffect, useState} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import axios from 'axios';
import AddBookForm from "../hooks/AddBook.tsx";

const Profile: React.FC = () => {
  const {user, isAuthenticated, isLoading, getAccessTokenSilently} = useAuth0();
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get('http://localhost:8000/library', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchBooks();
    }
  }, [isAuthenticated]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {isAuthenticated ? (
        <div className="text-center">
          <h2 className="text-4xl font-semibold text-gray-800 mb-6">
            Welcome, {user?.name}
          </h2>
          <AddBookForm onBookAdded={fetchBooks}/>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
            {books.length > 0 ? (
              books.map((book: any) => (
                <div
                  key={book.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
                >
                  <img
                    src={book.coverImage || 'https://via.placeholder.com/150'}
                    alt={book.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
                    <p className="text-gray-600">{book.author || book.authors?.join(', ')}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No books in your library yet!</p>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-600">Please log in to view your profile.</div>
      )}
    </div>
  );
};

export default Profile;
