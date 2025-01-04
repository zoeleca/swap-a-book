import {useFetchLibrary} from "../ui/hooks/handle-click.ts";

const HomePage = () => {
  const { loading, error, handleClick } = useFetchLibrary();
  return (
    <>
      <div className=" p-40 flex flex-col justitify- items-center">
        <div className="font-helvetica border-t border-b p-20 flex flex-col">
          <h1 className="text-5xl text-amber-950 font-bold text-center">
            Swap a Book
          </h1>
          <br />
          <h3 className="my-3 text-xl text-amber-950 font-bold text-center">
            Your neighborhood library, reimagined.
          </h3>
          <p className="text-m text-amber-950 text-center">
            BookSwap is a web application designed to bring people together
            through the love of books. Whether you're a casual reader or a
            bookworm, our platform allows you to exchange books with others in
            your community, making it easier than ever to discover new stories
            and share the ones you love.
          </p>
        </div>
        <button
          onClick={handleClick}
          className="mt-6 inline-block b-4 bg-amber-950   px-6 py-2 font-semibold rounded-lg text-white shadow shadow-amber-950 hover:bg-white hover:text-amber-950 hover:font-semibold hover:border-amber-950"
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
