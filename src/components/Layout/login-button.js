import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = ({ style }) => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      style={{
        ...style,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
      }}
      onClick={() => loginWithRedirect()}
    >
      Log In
    </button>
  );
};

export default LoginButton;
