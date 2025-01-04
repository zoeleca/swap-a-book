import * as HoverCard from "@radix-ui/react-hover-card";
import {AvatarIcon} from "@radix-ui/react-icons";
import {useFetchLibrary} from "../hooks/handle-click.ts";

const Header = () => {
  const { loading, error, handleClick } = useFetchLibrary();

  return (
    <HoverCard.Root openDelay={0}>
      <nav className="bg-amber-950 text-white py-4 px-6 flex items-center justify-between shadow-md">
        <div>
          <a href="/">
            <h1 className="text-3xl font-bold">Swap a Book</h1>
          </a>
        </div>
        <div className="flex items-center space-x-4">
            <AvatarIcon className="w-7 h-7"/>
          <a href="/Login">
            <button
              onClick={handleClick}
              className="ml-2 inline-block b-4 bg-amber-950 px-6 py-2 font-semibold rounded-3xl text-white shadow shadow-amber-950 hover:bg-white hover:text-amber-950 hover:font-semibold hover:border-amber-950"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login / Join"}
            </button>
            {error && <p className="mt-4 text-red-500">{error}</p>}
          </a>

        </div>
      </nav>
    </HoverCard.Root>
  );
};

export default Header;