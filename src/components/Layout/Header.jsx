import React from 'react';
import { Image, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'; // Auth0
import Logo from '../../styles/Images/WhiteLogo.png';
import { colors } from '../../styles/data_vis_colors';

const { primary_accent_color } = colors;

function HeaderContent() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: primary_accent_color,
      }}
    >
      <div className="hrf-logo">
        <a href="https://www.humanrightsfirst.org/">
          <Image width={100} src={Logo} preview={false} alt="HRF logo white" />
        </a>
      </div>
      <div>
        <Link to="/" style={{ color: '#E2F0F7', paddingRight: '75px' }}>
          Home
        </Link>
        <Link to="/graphs" style={{ color: '#E2F0F7', paddingRight: '75px' }}>
          Graphs
        </Link>
        {isAuthenticated && (
          <Link
            to="/profile"
            style={{ color: '#E2F0F7', paddingRight: '75px' }}
          >
            Profile
          </Link>
        )}
        {isAuthenticated ? (
          <Button
            onClick={() => logout({ returnTo: window.location.origin })}
            style={{ marginRight: '10px' }}
          >
            Log Out
          </Button>
        ) : (
          <Button
            onClick={() => loginWithRedirect()}
            style={{ marginRight: '10px' }}
          >
            Log In
          </Button>
        )}
      </div>
    </div>
  );
}

export { HeaderContent };
