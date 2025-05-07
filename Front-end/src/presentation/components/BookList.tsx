import React from "react";
import DefaultBookCoverImage from "../images/bookCover.png";

interface Book {
  id: number;
  title: string;
  author?: string;
  authors?: string[];
  coverImage?: string;
  categories?: string[];
}

interface BookGridProps {
  books: Book[];
}

const BookGrid: React.FC<BookGridProps> = ({books}) => {
  if (books.length === 0) {
    return <p className="text-gray-600">No books in your library yet!</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
      {books.map((book) => (
        <div
          key={book.id}
          className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
        >
          <img
            src={book.coverImage || DefaultBookCoverImage}
            alt={book.title}
            className="w-full h-56 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
            <p className="text-gray-600">{book.author || book.authors?.join(', ')}</p>
            {book.categories && (
              <p className="text-sm text-amber-900-600 mt-2">
                Categories: {book.categories.join(', ')}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookGrid;
