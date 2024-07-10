import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// Login button component that uses Auth0 for authentication
const LoginButton = ({ style }) => {
  // Get the loginWithRedirect function from Auth0
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      style={{
        ...style, // Apply any custom styles passed as props
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
      }}
      onClick={() => loginWithRedirect()} // Trigger Auth0 login process on click
    >
      Log In
    </button>
  );
};

export default LoginButton;
