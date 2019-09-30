/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-filename-extension */
/* istanbul ignore file */
import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import configureStore from './core/stores/configureStore';

import AppHot from './jsx/AppHot';

const appStore = configureStore();
const RootHot = ({ store, history }) => (
  <Provider store={store}>
    <AppHot history={history} />
  </Provider>
);
RootHot.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

render(
  <RootHot store={appStore.store} history={appStore.history} />,
  document.getElementById('root'),
);
