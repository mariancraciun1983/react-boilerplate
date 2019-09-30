import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { updateMovie } from '../../../../core/stores/reducers/cart';

const actionsToProps = (dispatch) => ({
  addToCart: (id) => dispatch(updateMovie(id, 1)),
});

class Movie extends React.PureComponent {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
  }

  addToCart() {
    const { addToCart, movie } = this.props;
    addToCart(movie.id);
  }

  render() {
    const { movie } = this.props;
    return (
      <div className="col col-12 col-sm-6 col-md-4 col-xl-3 pr-3 pb-3">
        <Link to={`/movie/${movie.id}/${movie.slug}`}>
          <img src={movie.image} className="img-fluid" width="100%" alt="Movie" />
        </Link>
        <div className="d-flex pt-3">
          <div className="flex-grow-1">
            <Link to={`/movie/${movie.id}/${movie.slug}`}>
              <strong>{movie.title}</strong>
            </Link>
            <br />
            <span
              className="text-danger fw-700 mr-2"
              style={{ textDecoration: 'line-through' }}
            >
              {`${movie.discounted ? movie.discounted : ''}$`}
            </span>
            <span>
              {`${movie.price}$`}
            </span>
            <br />
          </div>
          <div className="ml-auto add-cart">
            <button type="button" className="btn btn-primary" onClick={this.addToCart}>
              <i className="fas fa-cart-plus" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Movie.propTypes = {
  addToCart: PropTypes.func.isRequired,
  movie: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
    discounted: PropTypes.number,
    slug: PropTypes.string,
  }),
};
Movie.defaultProps = {
  movie: null,
};

export const Component = Movie;

export default connect(
  null,
  actionsToProps,
)(Movie);
