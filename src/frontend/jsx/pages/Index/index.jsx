import React from 'react';
import { Switch, Route } from 'react-router';

import Main from './Main';
import Genre from './Genre';

const indexRoutes = () => (
  <Switch>
    <Route component={Main} path="/" exact />
  </Switch>
);

const genreRoutes = () => (
  <Switch>
    <Route component={Genre} path="/genre/:genre_slug" />
  </Switch>
);

export default { indexRoutes, genreRoutes };
