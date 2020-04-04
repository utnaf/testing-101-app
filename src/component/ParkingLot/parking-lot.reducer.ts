import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE } from 'src/shared/reducer/action-types.utils';
import { IParkingLot, defaultValue } from './parking-lot.model';

export const ACTION_TYPES = {
  FETCH_PARKING_LOT_LIST: 'rule/FETCH_PARKING_LOT_LIST',
  FETCH_PARKING_LOT: 'rule/FETCH_PARKING_LOT',
  CREATE_PARKING_LOT: 'rule/CREATE_PARKING_LOT',
  RESET: 'rule/RESET'
};

const initialState = {
  loading: false,
  isError: false,
  updateSuccess: false,
  entities: [] as ReadonlyArray<IParkingLot>,
  entity: defaultValue
};

export type ParkingLotState = Readonly<typeof initialState>;

// Reducer
export default (state: ParkingLotState = initialState, action): ParkingLotState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PARKING_LOT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PARKING_LOT):
    case REQUEST(ACTION_TYPES.CREATE_PARKING_LOT):
      return {
        ...state,
        isError: false,
        updateSuccess: false,
        loading: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PARKING_LOT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PARKING_LOT_LIST):
    case FAILURE(ACTION_TYPES.CREATE_PARKING_LOT):
      return {
        ...state,
        loading: false,
        isError: true
      };
    case SUCCESS(ACTION_TYPES.FETCH_PARKING_LOT_LIST):
      return {
        ...state,
        loading: false,
        updateSuccess: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PARKING_LOT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
        updateSuccess: true
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = '/lots';

// Actions
export const getParkingLots = () => {
  return {
    type: ACTION_TYPES.FETCH_PARKING_LOT_LIST,
    payload: axios.get<IParkingLot>(`${apiUrl}`)
  };
};

export const getParkingLot = id => {
  return {
    type: ACTION_TYPES.FETCH_PARKING_LOT,
    payload: axios.get<IParkingLot>(`${apiUrl}/${id}`)
  };
};

export const createParkingLot = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PARKING_LOT,
    payload: axios.post(apiUrl, entity)
  });
  dispatch(getParkingLots());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
