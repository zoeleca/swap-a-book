import React from "react";
import DefaultBookCoverImage from "../assets/bookCover.png";
import DeleteBookButton from "./DeleteBookButton.tsx";
import { Book } from "../../domain/models/Book.ts";


interface BookGridProps {
  books: Book[];
  onDelete: (id: string) => void;
  onClickBook: (book: Book) => void;

}

const LibraryBookGrid: React.FC<BookGridProps> = ({books, onDelete, onClickBook}) => {
  if (books.length === 0) {
    return <p className="text-amber-900 text-lg text-center mt-12">No books in your library yet!</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10 px-8 pb-10">
      {books.map((book) => (
        <div
          key={book.id}
          className="bg-white rounded-2xl shadow-xl border border-amber-900 transition-all transform hover:scale-[1.02] flex flex-col overflow-hidden cursor-pointer" // Added cursor-pointer for the clickable effect
          onClick={() => onClickBook(book)} // Call the onClickBook handler on click
        >
          <img
            src={book.coverImage || DefaultBookCoverImage}
            alt={book.title}
            className="w-full h-60 object-cover border-b border-amber-900"
          />
          <div className="p-5 flex flex-col justify-between flex-1">
            <div>
              <h3 className="text-xl font-semibold text-amber-900 mb-2">{book.title}</h3>
              <p className="text-amber-700 mb-2">
                {book.authors?.join(', ')}
              </p>
              {book.categories && (
                <p className="text-sm text-amber-600 italic">
                  Categories: {book.categories.join(', ')}
                </p>
              )}
            </div>
            <div className="mt-4">
              <DeleteBookButton bookId={book.id} onDelete={onDelete}/>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LibraryBookGrid;
