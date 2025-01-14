import { useState } from "react";

export const useFetchLibrary = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8000/books`);
      if (!response.ok) {
        throw new Error("Failed to fetch library");
      }
      const data = await response.json();
      console.log("LibraryModel data:", data); // Handle the response as needed
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
      setError("An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleClick };
};
