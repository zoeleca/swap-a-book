const SearchBar = () => {
  return (
    <>
      <form>
        <div className="w-full xs:w-1/2 flex flex-col gap-3 p-10">
          <input
            className="block w-full border-gray-800 rounded text-md font-light   text-gray-700 py-3 leading-tight focus:outline-none "
            id="title"
            type="text"
            // value={titleSearch}
            // onChange={(e) => setTitleSearch(e.target.value)}
            placeholder="Type a title or an author"
          />
        </div>
      </form>
    </>
  );
};
export default SearchBar;
