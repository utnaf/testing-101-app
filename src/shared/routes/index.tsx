import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPage from 'src/component/Login/login-page';

const Routes = () => (
  <div className="view-routes">
    <Switch>
      <Route path="/login" exact component={LoginPage} />
    </Switch>
  </div>
);

export default Routes;
