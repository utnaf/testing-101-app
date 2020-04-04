import { combineReducers } from 'redux';

import parkingLot, { ParkingLotState } from 'src/component/ParkingLot/parking-lot.reducer';

export interface IRootState {
  readonly parkingLot: ParkingLotState;
}

const rootReducer = combineReducers<IRootState>({
  parkingLot
});

export default rootReducer;
