import { useState } from "react";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:8000/library/e0ade3e6-b3fc-47df-828b-eac844dcea85/books`
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
  return (
    <>
      <div className=" p-40 flex flex-col justitify- items-center">
        <div className="font-helvetica border-t border-b p-20 flex flex-col">
          <h1 className="text-5xl text-amber-50 font-bold text-center">
            Swap a Book
          </h1>
          <br />
          <h3 className="my-3 text-xl text-amber-50 font-bold text-center">
            Your neighborhood library, reimagined.
          </h3>
          <p className="text-m text-amber-50 text-center">
            BookSwap is a web application designed to bring people together
            through the love of books. Whether you're a casual reader or a
            bookworm, our platform allows you to exchange books with others in
            your community, making it easier than ever to discover new stories
            and share the ones you love.
          </p>
        </div>
        <button
          onClick={handleClick}
          className="mt-6 inline-block px-6 py-2 bg-red-950 text-white font-semibold rounded-lg shadow-md hover:bg-red-50 hover:text-red-500"
          disabled={loading}
        >
          {loading ? "Loading..." : "Go to My LibraryModel"}
        </button>

        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </>
  );
};
export default HomePage;
