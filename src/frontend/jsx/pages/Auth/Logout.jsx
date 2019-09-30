import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { authLogout } from '../../../core/stores/reducers/auth';

const actionsToProps = (dispatch) => ({
  authUserLogout: () => dispatch(authLogout()),
  redirect: (to) => dispatch(push(to)),
});

class Logout extends React.PureComponent {
  componentDidMount() {
    const { authUserLogout, redirect } = this.props;
    authUserLogout();
    setTimeout(() => {
      redirect('/');
    }, 300);
  }

  render() {
    return (
      <div style={{ minHeight: 300 }}>
        <h4>Logout</h4>
        <p>
          You are being logged out. Please wait while we are redirecting you to the homepage
        </p>
      </div>
    );
  }
}

Logout.propTypes = {
  redirect: PropTypes.func.isRequired,
  authUserLogout: PropTypes.func.isRequired,
};

export const Component = Logout;
export default connect(
  null,
  actionsToProps,
)(Logout);
