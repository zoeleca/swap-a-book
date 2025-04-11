import {useAuth0} from "@auth0/auth0-react";

const LoginButton = () => {
  const {loginWithRedirect, logout, isAuthenticated, user} = useAuth0();

  return (
    <div className="flex items-center space-x-3">
      {isAuthenticated ? (
        <>
          <span>{user?.name}</span>
          <button
            onClick={() => logout({logoutParams: {returnTo: window.location.origin}})}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={() => loginWithRedirect()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default LoginButton;
