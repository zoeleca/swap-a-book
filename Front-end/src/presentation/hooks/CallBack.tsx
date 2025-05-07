import {useAuth0} from '@auth0/auth0-react';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const AuthCallback = () => {
  const {isAuthenticated, user, handleRedirectCallback} = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth0Redirect = async () => {
      try {
        await handleRedirectCallback(); // This processes the code and state from the URL.
        if (isAuthenticated) {
          navigate('/profile'); // Redirect to profile page after login.
        }
      } catch (error) {
        console.error('Error processing Auth0 redirect:', error);
      }
    };

    handleAuth0Redirect();
  }, [handleRedirectCallback, isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
    </div>
  );
};

export default AuthCallback;
