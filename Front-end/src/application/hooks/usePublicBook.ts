import {useEffect, useState} from "react";
import {BookService} from "../services/BookService";
import {Book} from "../../domain/models/Book";

export const usePublicBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const bookService = new BookService();

    const fetchBooks = async () => {
      try {
        const fetchedBooks = await bookService.getBooks();
        setBooks(fetchedBooks);
      } catch (err) {
        setError("Failed to load books from the library.");
      }
    };

    fetchBooks();
  }, []);

  return {books, error};
};
