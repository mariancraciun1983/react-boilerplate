import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getText } from '../../../../core/utils/trans';
import { cartSize } from '../utils/selectors';
import { authIsAuthenticated, authUser } from '../../../../core/selectors';

const stateToProps = (state) => ({
  cartMovies: cartSize(state),
  isAuthenticated: authIsAuthenticated(state),
  user: authUser(state),
});

class Menu extends React.PureComponent {
  static renderGuest() {
    return (
      <>
        <div className="btn-group" role="group">
          <Link className="btn btn-secondary" to="/auth/login">
            {getText('Login')}
          </Link>
          <Link className="btn btn-primary" to="/auth/register">
            {getText('Signup')}
          </Link>
        </div>
      </>
    );
  }

  renderUser() {
    const { user } = this.props;
    return (
      <>
        <strong className="text-primary">
          {getText('Hello!')}
          &nbsp;
          {user.name}
          &nbsp;
        </strong>
        <Link className="btn btn-outline-secondary" to="/auth/logout">
          Logout
        </Link>
      </>
    );
  }

  render() {
    const { cartMovies, isAuthenticated } = this.props;
    return (
      <>
        <nav className="mr-5">
          <Link className="btn btn-warning" to="/cart">
            <i className="fas fa-shopping-cart" />
            Cart
            {cartMovies ? <sup>{cartMovies}</sup> : ''}
          </Link>
        </nav>
        {isAuthenticated ? this.renderUser() : Menu.renderGuest()}
      </>
    );
  }
}


Menu.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  cartMovies: PropTypes.number.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
};

Menu.defaultProps = {
  user: { name: '' },
};

export const Component = Menu;
export default connect(
  stateToProps,
  null,
)(Menu);
