import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AddBookForm from "../components/AddBookForm";
import LibraryBookGrid from "../components/LibraryBookList";
import BookDetailModal from "../components/BookDetailModal";
import ProfileHeader from "../components/ProfileHeader";
import { Book } from "../../domain/models/Book";
import { useBooks } from "../hooks/UseBooks";
import DeleteAccountButton from "../components/DeleteAccountButton";
import Footer from "../components/Footer";

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { books, fetchBooks, deleteBook } = useBooks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);


  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated || !user) return <div className="text-center text-gray-600">Please log in to view your
    profile.</div>;

  return (
    <div className="max-w-7xl mx-auto">
      <ProfileHeader user={user}/>
        <AddBookForm onBookAdded={fetchBooks}/>
        <LibraryBookGrid
          books={books}
          onDelete={deleteBook}
          onClickBook={(book) => {
            setSelectedBook(book);
            setIsModalOpen(true);
          }}
        />
      <BookDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        book={selectedBook}
      />
      <DeleteAccountButton/>
      <Footer/>
    </div>
  );
};

export default ProfilePage;
