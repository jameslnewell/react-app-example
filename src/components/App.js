import React from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import styled, {injectGlobal} from 'styled-components';
import {Margin} from 'styled-components-spacing';
import loadAsync from './Loader';
import Shell from './Shell';

/* eslint-disable */
injectGlobal`

  html, body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }

`;
/* eslint-enable */

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Header = styled.header`
  height: 40px;
  background-color: green;
`;

const Content = styled.div`
  flex-grow: 1;
`;

const Footer = styled.footer`
  height: 100px;
  background-color: grey;
`;

const App = () => (
  <Layout>
    <Header />

    <Margin all={2}>
      <Link to="/">Home</Link>
      {' '}
      <Link to="/contact">Contact</Link>
    </Margin>

    <Content>
      <Margin all={2}>
        <Switch>
          <Route
            exact
            path="/"
            component={loadAsync(() => import('./pages/Home'), {loading: Shell})}
          />
          <Route
            path="/contact"
            component={loadAsync(() => import('./pages/Contact'), {loading: Shell})}
          />
        </Switch>
      </Margin>
    </Content>
    <Footer />
  </Layout>
);

export default App;
