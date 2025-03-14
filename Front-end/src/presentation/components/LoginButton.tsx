import {useAuth0} from "@auth0/auth0-react";
import axios from "axios";

const LoginButton = () => {
  const {loginWithRedirect, getAccessTokenSilently, isAuthenticated} =
    useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
  };

  const fetchData = async () => {
    if (!isAuthenticated) return;

    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get(
        "http://localhost:8000/protected-route",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      {!isAuthenticated ? (
        <button onClick={handleLogin}>Log In</button>
      ) : (
        <button onClick={fetchData}>Fetch Protected Data</button>
      )}
    </>
  );
};

export default LoginButton;
