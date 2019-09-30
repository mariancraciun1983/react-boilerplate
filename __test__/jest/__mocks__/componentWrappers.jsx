import React  from 'react';
import clone from 'clone-deep';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import mockStore  from './store';


const { fullStore } = mockStore;

const genericWrapper = (children) => {
  const mockStore = configureStore();
  const initialState = clone(fullStore);
  const store = mockStore(initialState);
  return (
    <Provider store={store}>
      <Router>
        {children}
      </Router>
    </Provider>
  )
};

export {
  genericWrapper
};
