import { useEffect, useState } from "react";
import axios from "axios";

export interface GoogleBook {
  id: string;
  title: string;
  authors: string[];
  categories: string[];
  language: string;
  thumbnail?: string;
  description?: string;
}

export const UseGoogleBooksSearch = (query: string) => {
  const [results, setResults] = useState<GoogleBook[]>([]);

  useEffect(() => {
    if (!query) return;

    const timeoutId = setTimeout(async () => {
      try {
        const res = await axios.get("https://www.googleapis.com/books/v1/volumes", {
          params: { q: query, maxResults: 5 },
        });

        const books: GoogleBook[] = res.data.items?.map((item: any) => ({
          id: item.id,
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors || [],
          categories: item.volumeInfo.categories || [],
          language: item.volumeInfo.language || "unknown",
          thumbnail: item.volumeInfo.imageLinks?.thumbnail || undefined,
          description: item.volumeInfo.description || "", // ✅ Include description here
        })) || [];

        setResults(books);
      } catch (err) {
        console.error("Error fetching books:", err);
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return results;
};
