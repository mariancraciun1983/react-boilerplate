import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';

import Layout from './common/Layout';

import Index from './pages/Index';
import Auth from './pages/Auth';
import Cart from './pages/Cart';
import Movie from './pages/Movie';
import Errors from './pages/Errors';

class Routes extends React.Component {
  renderRoutes() {
    const { location } = this.props;
    return (
      <Switch location={location}>
        <Route path="/error"><Errors.routes /></Route>
        <Route path="/cart"><Cart.routes /></Route>
        <Route path="/auth"><Auth.routes /></Route>
        <Route path="/movie"><Movie.routes /></Route>
        <Route path="/genre"><Index.genreRoutes /></Route>
        <Route path="/"><Index.indexRoutes /></Route>
        <Route><Errors.Error404 /></Route>
      </Switch>
    );
  }

  render() {
    return (
      <Route>
        <Layout>{this.renderRoutes()}</Layout>
      </Route>
    );
  }
}
Routes.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
export const Component = Routes;
export default Routes;
