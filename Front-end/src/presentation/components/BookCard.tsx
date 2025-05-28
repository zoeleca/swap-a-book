import React from "react";
import {Book} from "../../domain/models/Book";

interface BookCardProps {
  book: Book;
  onClick: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({book, onClick}) => {
  return (
    <div className="book-card" onClick={() => onClick(book)}>
      <img src={book.coverImage} alt={book.title}/>
      <h3>{book.title}</h3>
      <p>{book.author}</p>
    </div>
  );
};

export default BookCard;
