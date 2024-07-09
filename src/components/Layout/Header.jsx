import React from 'react';
import { Image } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../../styles/Images/WhiteLogo.png';
import { colors } from '../../styles/data_vis_colors';
import LoginButton from './login-button';
import LogoutButton from './logout-button';
import { useAuth0 } from '@auth0/auth0-react';

const { primary_accent_color } = colors;

function HeaderContent() {
  const { isAuthenticated } = useAuth0();

  const linkStyle = {
    color: '#E2F0F7',
    marginRight: '20px',
    fontSize: '14px',
  };

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
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={linkStyle}>
          Home
        </Link>
        <Link to="/graphs" style={linkStyle}>
          Graphs
        </Link>
        {isAuthenticated && (
          <Link to="/profile" style={linkStyle}>
            Profile
          </Link>
        )}
        {isAuthenticated ? (
          <LogoutButton style={linkStyle} />
        ) : (
          <LoginButton style={linkStyle} />
        )}
      </div>
    </div>
  );
}

export { HeaderContent };
