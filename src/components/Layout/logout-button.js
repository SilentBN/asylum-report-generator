import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// Logout button component that uses Auth0 for authentication
const LogoutButton = ({ style }) => {
  // Get the logout function from Auth0
  const { logout } = useAuth0();
  return (
    <button
      style={{
        ...style, // Apply any custom styles passed as props
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
      }}
      onClick={() => logout({ returnTo: window.location.origin })} // Trigger Auth0 logout process on click
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
