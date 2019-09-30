import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Error404 from './Error404';

const routes = () => (
  <Switch>
    <Route path="/error/404" component={Error404} exact />
    <Redirect to={{ state: { error404: true, sourceModule: 'error' } }} />
  </Switch>
);

export default { routes, Error404 };
