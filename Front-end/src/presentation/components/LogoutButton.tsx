import {useAuth0} from '@auth0/auth0-react';

const LogoutButton = () => {
  const {logout} = useAuth0();

  return (
    <button
      onClick={() =>
        logout({
          logoutParams: {
            returnTo: window.location.origin, // Redirect to homepage after logout
          },
        })
      }
      className="bg-amber-950 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
