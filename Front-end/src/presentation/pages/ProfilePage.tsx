import React, {useEffect, useState} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import axios from 'axios';
import AddBookForm from "../hooks/AddBook.tsx";
import BookGrid from "../components/BookList.tsx";

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
          <BookGrid books={books}/>
        </div>
      ) : (
        <div className="text-center text-gray-600">Please log in to view your profile.</div>
      )}
    </div>
  );
};

export default Profile;
