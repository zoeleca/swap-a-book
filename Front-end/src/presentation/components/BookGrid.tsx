import React from "react";
import DefaultBookCoverImage from "../assets/bookCover.png";
import { Book } from "../../domain/models/Book";

const getAuthors = ( authors?: string[]): string => {
  if (authors?.length) return authors.join(", ");
  return "Unknown Author";
};

const getCategories = (categories?: string[]): string => {
  if (categories && categories.length > 0) {
    return categories.join(", ");
  }
  return "";
};

interface BookGridProps {
  books: Book[];
  onClickBook: (book: Book) => void;
}

const BookGrid: React.FC<BookGridProps> = ({books, onClickBook}) => {
  if (books.length === 0) {
    return <p className="text-amber-900 text-lg text-center mt-12">No books yet!</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10 px-4">
      {books.map((book) => {
        const {id, title, authors, coverImage, categories} = book;
        const bookAuthor = getAuthors(authors);
        const bookCategories = getCategories(categories);

        return (
          <div
            key={id}
            className="bg-white rounded-2xl shadow-xl border border-amber-900 transition-all transform hover:scale-[1.02] flex flex-col overflow-hidden cursor-pointer"
            onClick={() => onClickBook(book)}
          >
            <img
              src={coverImage || DefaultBookCoverImage}
              alt={title}
              className="w-full h-60 object-cover border-b border-amber-900"
            />
            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">{title}</h3>
                <p className="text-amber-700 mb-2">{bookAuthor}</p>
                {bookCategories && (
                  <p className="text-sm text-amber-600 italic">
                    Categories: {bookCategories}
                  </p>
                )}
                {book.ownerName && (
                  <p className="text-xs text-gray-500 mt-1">Posted by {book.ownerName}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookGrid;
