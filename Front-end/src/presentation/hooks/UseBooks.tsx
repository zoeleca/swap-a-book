// hooks/useBooks.ts
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import axios from "axios";

export interface Book {
  id: string;
  title: string;
  author?: string;
  authors?: string[];
  coverImage?: string;
  categories?: string[];
}

export const useBooks = () => {
  const {getAccessTokenSilently, isAuthenticated} = useAuth0();
  const [books, setBooks] = useState<Book[]>([]);
  const baseUrl = import.meta.env.VITE_API_URL;

  const fetchBooks = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await axios.get(`${baseUrl}/library/books`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const deleteBook = async (id: string) => {
    try {
      const token = await getAccessTokenSilently();
      await axios.delete(`${baseUrl}/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchBooks(); // Refresh after deletion
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchBooks();
    }
  }, [isAuthenticated]);

  return {books, fetchBooks, deleteBook};
};
