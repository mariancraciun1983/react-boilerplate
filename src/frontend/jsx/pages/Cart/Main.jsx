import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {
  cartItems, cartTotal, cartSaved, authIsAuthenticated,
} from '../../../core/selectors';
import { updateMovie, save } from '../../../core/stores/reducers/cart';
import { formatPrice } from '../../../core/utils/formatter';
import Item from './components/Item';

const stateToProps = (state) => ({
  saved: cartSaved(state),
  items: cartItems(state),
  total: cartTotal(state),
  isAuthenticated: authIsAuthenticated(state),
});
const actionsToProps = (dispatch) => ({
  updateCartMovie: (id, qty) => dispatch(updateMovie(id, qty)),
  saveCart: () => dispatch(save()),
  redirect: (to) => dispatch(push(to)),
});
class Main extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onUpdateMovie = this.onUpdateMovie.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onUpdateMovie(id, quantity) {
    const { updateCartMovie } = this.props;
    updateCartMovie(id, quantity);
  }

  onSave() {
    const { saveCart, isAuthenticated, redirect } = this.props;
    if (isAuthenticated) saveCart();
    else redirect('/auth/login');
  }

  render() {
    const { items, total, saved } = this.props;
    return (
      <>
        <div className="container">
          <div className="card-header">
            <h1>Shopping Cart</h1>
          </div>
          <div className="card-body">
            {items.map((item) => (
              <Item
                movie={item.movie}
                quantity={item.quantity}
                key={item.movie.id}
                onUpdate={this.onUpdateMovie}
              />
            ))}
            <div className="d-flex">
              <div className="flex-grow-1">
                <strong>{`Total: ${formatPrice(total)}$`}</strong>
              </div>
              <button
                type="submit"
                disabled={items.length === 0 || saved}
                onClick={this.onSave}
                className="btn btn-success btn-lg"
              >
                Save Cart
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

Main.propTypes = {
  updateCartMovie: PropTypes.func.isRequired,
  saveCart: PropTypes.func.isRequired,
  redirect: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  saved: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  total: PropTypes.number.isRequired,
};

export const Component = Main;
export default connect(
  stateToProps,
  actionsToProps,
)(Main);
