import React from "react";
import {Book} from "../../domain/models/Book";

export interface BookDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
}

const BookDetailModal: React.FC<BookDetailModalProps> = ({isOpen, book, onClose}) => {
  if (!isOpen || !book) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{book.title}</h2>
        <p>{book.author}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default BookDetailModal;
