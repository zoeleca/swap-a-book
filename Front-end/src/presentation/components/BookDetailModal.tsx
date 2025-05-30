import React from "react";
import { Book } from "../../domain/models/Book";

export interface BookDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
}

const BookDetailModal: React.FC<BookDetailModalProps> = ({ isOpen, onClose, book }) => {
  if (!isOpen || !book) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-lg w-4/5 sm:w-1/2 p-8 max-h-full overflow-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-lg font-bold text-amber-800"
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold text-amber-900">{book.title}</h2>
        <p className="text-xl text-amber-700">by {book.author || book.authors?.join(', ')}</p>

        {book.coverImage && (
          <img
            src={book.coverImage}
            alt={book.title}
            className="mt-4 mb-6 max-w-xs mx-auto h-auto rounded-xl"
          />
        )}

        <div className="mt-4">
          <h3 className="font-semibold text-amber-800">Categories:</h3>
          <p className="text-amber-600">{book.categories?.join(", ")}</p>
        </div>

        {book.description && (
          <div className="mt-6">
            <h3 className="font-semibold text-amber-800">Description:</h3>
            <p className="text-gray-700 whitespace-pre-line">{book.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetailModal;
