import { useEffect, useState } from "react";
import axios from "axios";
import { Book } from "../../domain/models/Book.ts";

export const usePublicBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${baseUrl}/library/`);
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
