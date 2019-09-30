/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Router } from 'react-router';
import { connect } from 'react-redux';

import { appGetState, uiVersion } from '../core/selectors';
import { initialize as appInitialize } from '../core/stores/reducers/app';

import Routes from './Routes';

const stateToProps = (state) => ({
  appState: appGetState(state),
  version: uiVersion(state),
});
const actionsToProps = (dispatch) => ({
  initialize: () => dispatch(appInitialize()),
});

class App extends React.Component {
  componentDidMount() {
    const { initialize } = this.props;
    initialize();
  }

  shouldComponentUpdate(nextProps) {
    const { appState, version } = this.props;
    if (appState !== nextProps.appState) return true;
    if (version !== nextProps.version) return true;
    return false;
  }

  renderLoading() {
    return (
      <div className="Loading">
        <div className="loader-container">
          <div className="loader">
            <div className="blobs blobs-dark">
              <div className="blob-center" />
              <div className="blob blob-dark" />
              <div className="blob blob-dark" />
              <div className="blob blob-dark" />
              <div className="blob blob-dark" />
              <div className="blob blob-dark" />
              <div className="blob blob-dark" />
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
              <defs>
                <filter id="goo">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                    result="goo"
                  />
                  <feBlend in="SourceGraphic" in2="goo" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  renderLoaded() {
    const { history } = this.props;
    return (
      <>
        <Router history={history} forceRefresh>
          <Route component={Routes} />
        </Router>
      </>
    );
  }

  renderError() {
    return <h1 className="Error">Application Error!</h1>;
  }

  render() {
    const { appState, version } = this.props;
    let content = null;
    if (appState === 'loaded') content = this.renderLoaded();
    else if (appState === 'error') content = this.renderError();
    else content = this.renderLoading();
    return <div className="App" key={version}>{content}</div>;
  }
}

App.propTypes = {
  appState: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  initialize: PropTypes.func.isRequired,
  version: PropTypes.number.isRequired,
};

App.defaultProps = {};

export const Component = App;
export default connect(
  stateToProps,
  actionsToProps,
)(App);
