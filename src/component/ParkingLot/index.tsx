import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ParkingLot from './parking-lot';
import ParkingLotForm from './parking-lot.form';

const Routes = ({ match }) => (
  <div>
    <Switch>
      <Route path={`${match.url}`} exact component={ParkingLot} />
      <Route path={`${match.url}/create`} exact component={ParkingLotForm} />
    </Switch>
  </div>
);

export default Routes;
