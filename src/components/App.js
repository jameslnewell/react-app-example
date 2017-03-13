import React from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import styled from 'styled-components';
import loadAsync from './Loader';

const Layout = styled.div`

`;

const Header = styled.header`
  height: 40px;
  background-color: green;
`;

const Footer = styled.footer`
  height: 100px;
  background-color: grey;
`;

export default () => (
  <Layout>
    <Header />
    <nav>
      <Link to="/">Home</Link>
      {' '}
      <Link to="/contact">Contact</Link>
    </nav>
    <Switch>
      <Route
        exact
        path="/"
        component={loadAsync(() => import('./pages/Home'))}
      />
      <Route
        path="/contact"
        component={loadAsync(() => import('./pages/Contact'))}
      />
    </Switch>
    <Footer />
  </Layout>
);
