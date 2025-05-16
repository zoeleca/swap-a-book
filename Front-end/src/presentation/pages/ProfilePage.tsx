// pages/Profile.tsx
import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AddBookForm from "../components/AddBookForm";
import LibraryBookGrid from "../components/LibraryBookList";
import BookDetailModal from "../components/BookDetailModal";
import ProfileHeader from "../components/ProfileHeader";
import { Book } from "../../domain/models/Book.ts";
import { useBooks } from "../hooks/UseBooks.tsx";
import DeleteAccountButton from "../components/DeleteAccountButton.tsx";
import Footer from "../components/Footer.tsx";

const Profile: React.FC = () => {
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

      <div className="mt-8 px-4">
        <AddBookForm onBookAdded={fetchBooks}/>
      </div>

      <div className="px-4 pb-10">
        <LibraryBookGrid
          books={books}
          onDelete={deleteBook}
          onClickBook={(book) => {
            setSelectedBook(book);
            setIsModalOpen(true);
          }}
        />
      </div>

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

export default Profile;
