import {useAuth0} from "@auth0/auth0-react";

const LoginButton = () => {
  const {loginWithRedirect, logout, isAuthenticated, user, isLoading} = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!isAuthenticated ? (
        <button
          onClick={() => loginWithRedirect()}
          className="bg-white text-amber-950 font-bold py-2 px-4 rounded hover:bg-amber-100"
        >
          Log In
        </button>
      ) : (
        <div className="flex items-center space-x-2">
          <span className="hidden sm:block">{user?.name}</span> {/* Show name only on desktop */}
          <button
            onClick={() => logout({logoutParams: {returnTo: window.location.origin}})}
            className="bg-white text-amber-950 font-bold py-2 px-4 rounded hover:bg-amber-100"
          >
            Log Out
          </button>
        </div>
      )}
    </>
  );
};

export default LoginButton;
