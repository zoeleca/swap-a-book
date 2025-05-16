import {useEffect, useState} from "react";
import axios from "axios";
import {Book} from "../../domain/models/Book.ts";

export const usePublicBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8000/library/");
        setBooks(response.data);
      } catch (err) {
        setError("Failed to load books from the library.");
        console.error(err);
      }
    };

    fetchBooks();
  }, []);

  return {books, error};
};
