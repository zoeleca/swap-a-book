import React from "react";
import {Book} from "../../domain/models/Book";

export interface BookDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
}

const BookDetailModal: React.FC<BookDetailModalProps> = ({isOpen, onClose, book}) => {
  if (!isOpen || !book) return null;

  return (
    <div
      id="book-modal-backdrop"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div
        id="book-modal-content"
        className="bg-white rounded-xl shadow-lg w-4/5 sm:w-1/2 p-8 max-h-full overflow-auto"
      >
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
            className="mt-4 mb-6 w-full h-auto rounded-xl"
          />
        )}
        <div className="mt-4">
          <h3 className="font-semibold text-amber-800">Categories:</h3>
          <p className="text-amber-600">{book.categories?.join(", ")}</p>
        </div>
      </div>
    </div>
  );
};


export default BookDetailModal;
