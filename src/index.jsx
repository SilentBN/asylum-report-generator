import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProfilePage from './components/pages/Profile/ProfilePage';
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';
import 'antd/dist/antd.less';
import { NotFoundPage } from './components/pages/NotFound';
import { LandingPage } from './components/pages/Landing';
import { FooterContent, SubFooter } from './components/Layout/Footer';
import { HeaderContent } from './components/Layout/Header';
import { Layout } from 'antd';
import GraphsContainer from './components/pages/DataVisualizations/GraphsContainer';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './state/reducers';
import { colors } from './styles/data_vis_colors';

const { primary_accent_color } = colors;

// Configure Redux store
const store = configureStore({ reducer: reducer });

// Render the app wrapped with necessary providers
ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory>
      <Provider store={store}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Provider>
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById('root')
);

// Main App component
export function App() {
  const { Footer, Header } = Layout;
  return (
    <Layout>
      {/* Header */}
      <Header
        style={{
          height: '10vh',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: primary_accent_color,
        }}
      >
        <HeaderContent />
      </Header>

      {/* Main content area with routes */}
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/graphs" component={GraphsContainer} />
        <Route path="/profile" component={ProfilePage} />
        <Route component={NotFoundPage} />
      </Switch>

      {/* Main footer */}
      <Footer
        style={{
          backgroundColor: primary_accent_color,
          color: '#E2F0F7',
        }}
      >
        <FooterContent />
      </Footer>

      {/* Sub-footer */}
      <Footer
        style={{
          backgroundColor: primary_accent_color,
          padding: 0,
        }}
      >
        <SubFooter />
      </Footer>
    </Layout>
  );
}
