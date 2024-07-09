import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = ({ style }) => {
  const { logout } = useAuth0();
  return (
    <button
      style={{
        ...style,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
      }}
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
