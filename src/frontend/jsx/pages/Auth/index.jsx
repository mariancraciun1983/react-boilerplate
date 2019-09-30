import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Login from './Login';
import Logout from './Logout';
import Register from './Register';

const routes = () => (
  <Switch>
    <Route component={Login} path="/auth/login" exact />
    <Route component={Register} path="/auth/register" exact />
    <Route component={Logout} path="/auth/logout" exact />
    <Redirect to={{ state: { error404: true, sourceModule: 'auth' } }} />
  </Switch>
);

export default { routes };
