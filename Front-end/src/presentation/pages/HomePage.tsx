import BookList from "../components/BookList.tsx";
import SearchBar from "../components/SearchBar.tsx";
import {useFetchLibrary} from "../hooks/Login.tsx";

const HomePage = () => {
  const {loading, error, handleClick} = useFetchLibrary();
  return (
    <>
      <div className=" p-40 flex flex-col justitify- items-center">
        <div className="w-full ">
          <h3 className="my-3 text-xl text-amber-950 font-bold ">
            Find A Book
          </h3>
          <SearchBar/>
        </div>
        <div className="font-helvetica border-t border-b p-20 flex flex-col">
          <h1 className="text-5xl text-amber-950 font-bold text-center">
            Swap a Book
          </h1>
          <br/>
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
          {loading ? "Loading..." : "Start your Journey"}
        </button>

        {error && <p className="mt-4 text-red-500">{error}</p>}
        <div className="w-full py-20">
          <div className="border-l border-r  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            <BookList/>
            <BookList/>
            <BookList/>
            <BookList/>
            <BookList/>
            <BookList/>
            <BookList/>
            <BookList/>
            <BookList/>
            <BookList/>
            <BookList/>
            <BookList/>
            <BookList/>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;
