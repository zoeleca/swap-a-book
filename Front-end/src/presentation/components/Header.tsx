import * as HoverCard from "@radix-ui/react-hover-card";
import {AvatarIcon} from "@radix-ui/react-icons";
import LoginButton from "./LoginButton.tsx";
import {useNavigate} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton.tsx";

const Header = () => {
  const navigate = useNavigate();
  const {isAuthenticated, user} = useAuth0();

  return (
    <HoverCard.Root openDelay={0}>
      <nav className="bg-amber-950 text-white py-4 px-6 flex items-center justify-between shadow-md">
        <div>
          <a href="/">
            <h1 className="text-3xl font-bold">Swap a Book</h1>
          </a>
        </div>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              {/* Wrap AvatarIcon in a div to ensure clickability */}
              <div
                className="relative cursor-pointer"
                onClick={() => navigate("/profile")}
                style={{zIndex: 10}} // Ensure it's clickable and not hidden
              >
                <AvatarIcon className="w-10 h-10"/>
              </div>
              <LogoutButton/>
              <span>{user?.name}</span> {/* Optionally show user's name */}
            </>
          ) : (
            <LoginButton/>
          )}
        </div>
      </nav>
    </HoverCard.Root>
  );
};

export default Header;
