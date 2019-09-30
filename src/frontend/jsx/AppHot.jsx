/* eslint-disable import/no-extraneous-dependencies */
/* istanbul ignore file */
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader/root';
import { setConfig } from 'react-hot-loader';
import React from 'react';

import App from './App';

setConfig({
  // logLevel: 'debug',
  reloadHooks: true,
});

function AppHot({ history }) {
  return (
    <App history={history} />
  );
}
AppHot.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
AppHot.defaultProps = {};

export const Component = AppHot;
export default hot(AppHot);
