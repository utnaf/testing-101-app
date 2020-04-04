import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ParkingLotRoutes from 'src/component/ParkingLot';

const Routes = () => (
  <Switch>
    <Redirect path="/" exact to="/lot" />
    <Route path="/lot" component={ParkingLotRoutes} />
  </Switch>
);

export default Routes;
