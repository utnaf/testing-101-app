import { createStore, compose, applyMiddleware } from 'redux';
import reducer, { IRootState } from 'src/shared/reducer';
import loggerMiddleware from './logger-middleware';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

const store = createStore(
  reducer,
  {} as IRootState,
  composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware, promiseMiddleware))
);

export default store;
