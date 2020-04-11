import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ParkingLot from './parking-lot';
import ParkingLotForm from './parking-lot.form';
import ParkingLotDashboard from './parking-lot-dashboard';

const Routes = ({ match }) => (
  <div>
    <Switch>
      <Route path={`${match.url}`} exact component={ParkingLot} />
      <Route path={`${match.url}/create`} exact component={ParkingLotForm} />
      <Route path={`${match.url}/:id`} component={ParkingLotDashboard} />
    </Switch>
  </div>
);

export default Routes;
