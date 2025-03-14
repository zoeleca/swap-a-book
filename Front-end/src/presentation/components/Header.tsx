import * as HoverCard from "@radix-ui/react-hover-card";
import { AvatarIcon } from "@radix-ui/react-icons";
import LoginButton from "./LoginButton.tsx";

const Header = () => {
  // const { loading, error } = useFetchLibrary();

  return (
    <HoverCard.Root openDelay={0}>
      <nav className="bg-amber-950 text-white py-4 px-6 flex items-center justify-between shadow-md">
        <div>
          <a href="/">
            <h1 className="text-3xl font-bold">Swap a Book</h1>
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <AvatarIcon className="w-7 h-7" />
          <LoginButton />
        </div>
      </nav>
    </HoverCard.Root>
  );
};

export default Header;
