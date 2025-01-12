import { useState } from "react";

export const useFetchLibrary = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:8000/library/2b3a774a-178d-404c-95d2-b2bc68970608/books`
      );
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
