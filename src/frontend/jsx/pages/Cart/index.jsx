import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Main from './Main';

const routes = () => (
  <Switch>
    <Route component={Main} path="/cart" exact />
    <Redirect to={{ state: { error404: true, sourceModule: 'cart' } }} />
  </Switch>
);

export default { routes };
