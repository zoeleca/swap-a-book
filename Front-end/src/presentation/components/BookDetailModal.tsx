import React, { useState } from "react";
import { Book } from "../../domain/models/Book";
import EditBookForm from "./EditBookForm";

export interface BookDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
}

const BookDetailModal: React.FC<BookDetailModalProps> = ({ isOpen, onClose, book }) => {
  const [isEditing, setIsEditing] = useState(false);

  console.log("Book passed to modal:", book);


  if (!isOpen || !book) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-xl shadow-lg w-4/5 sm:w-1/2 p-8 max-h-full overflow-auto relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-lg font-bold text-amber-800">&times;</button>

        {isEditing ? (
          <EditBookForm book={book} onSave={() => { setIsEditing(false); onClose(); }} onCancel={() => setIsEditing(false)} />
        ) : (
          <>
            <h2 className="text-3xl font-bold text-amber-900">{book.title}</h2>
            <p className="text-xl text-amber-700">by { book.authors?.join(', ')}</p>
            {book.coverImage && <img src={book.coverImage} alt={book.title} className="mt-4 mb-6 max-w-xs mx-auto h-auto rounded-xl" />}
            <p className="text-sm text-gray-500 mt-2">Posted by {book.ownerName}</p>

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

            {book.isOwnedByUser && (
              <button className="mt-6 text-sm text-blue-600 underline" onClick={() => setIsEditing(true)}>Edit</button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookDetailModal;