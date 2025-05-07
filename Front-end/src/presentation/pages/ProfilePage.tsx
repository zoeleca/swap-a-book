import React, {useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import axios from "axios";
import AddBookForm from "../hooks/AddBook.tsx";
import Cafe from "../images/Cafe.jpg";
import LibraryBookGrid from "../components/LibraryBookList.tsx";
import BookDetailModal from "../components/BookDetailModal.tsx"; // Assuming you have this component

interface Book {
  id: number;
  title: string;
  author?: string;
  authors?: string[];
  coverImage?: string;
  categories?: string[];
}

const Profile: React.FC = () => {
  const {user, isAuthenticated, isLoading, getAccessTokenSilently} = useAuth0();
  const [books, setBooks] = useState<Book[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleDeleteBook = async (id: number) => {
    try {
      const token = await getAccessTokenSilently();
      await axios.delete(`http://localhost:8000/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const fetchBooks = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get("http://localhost:8000/library/books", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchBooks();
    }
  }, [isAuthenticated]);

  const openModal = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto">
      {isAuthenticated ? (
        <>
          {/* Header section with banner and profile pic */}
          <div className="relative h-60 bg-amber-900">
            <img
              src={Cafe}
              alt="Profile banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <img
                src={user?.picture}
                alt={user?.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
            </div>
          </div>

          {/* Profile name and description */}
          <div className="mt-20 text-center px-4">
            <h2 className="text-3xl font-bold text-amber-900">{user?.name}</h2>
            <p className="text-gray-700 mt-2">Lover of books, curious mind, occasional writer. 📚✨</p>
          </div>

          {/* Add Book form */}
          <div className="mt-8 px-4">
            <AddBookForm onBookAdded={fetchBooks}/>
          </div>

          {/* Book list */}
          <div className="px-4 pb-10">
            <LibraryBookGrid
              books={books}
              onDelete={handleDeleteBook}
              onClickBook={openModal}
            />
          </div>

          {/* Modal */}
          <BookDetailModal
            isOpen={isModalOpen}
            onClose={closeModal}
            book={selectedBook}
          />
        </>
      ) : (
        <div className="text-center text-gray-600">Please log in to view your profile.</div>
      )}
    </div>
  );
};

export default Profile;
