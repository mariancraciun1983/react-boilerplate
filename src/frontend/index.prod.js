/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-filename-extension */
/* istanbul ignore file */
import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import configureStore from './core/stores/configureStore';

import App from './jsx/App';

const appStore = configureStore();

const Root = ({ store, history }) => (
  <Provider store={store}>
    <App history={history} />
  </Provider>
);
Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

render(
  <Root store={appStore.store} history={appStore.history} />,
  document.getElementById('root'),
);
