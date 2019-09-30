import React from 'react';
import { Switch, Route } from 'react-router';

import Main from './Main';

const routes = () => (
  <Switch>
    <Route component={Main} path="/movie/:movie_id/:name?" />
  </Switch>
);

export default { routes };
