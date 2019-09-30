import {
  createStore,
  applyMiddleware,
  combineReducers,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';

import defaultReducers from './reducers';
import rootSaga from '../sagas';
import { middleware as apiMiddleware } from '../middleware/api';
import assetsMiddleware from '../middleware/assets';

const sagaMiddleware = createSagaMiddleware({});
const historyOptions = {};
const history = createBrowserHistory(historyOptions);

export default function configureStore() {
  const initialState = {};
  const middlewares = [];
  middlewares.push(sagaMiddleware);
  middlewares.push(apiMiddleware);
  middlewares.push(assetsMiddleware);
  middlewares.push(routerMiddleware(history));

  // eslint-disable-next-line no-undef
  if (typeof __DEV__ !== 'undefined' && __DEV__ === true) {
    // eslint-disable-next-line global-require
    middlewares.push(require('../middleware/logger').default);
  }
  const rootReducer = combineReducers(defaultReducers);
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares),
  );
  sagaMiddleware.run(rootSaga);
  syncHistoryWithStore(history, store);
  assetsMiddleware.register(store);
  return { store, history };
}
