import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { movieById, genresBySlugs } from '../../../core/selectors';
import { updateMovie } from '../../../core/stores/reducers/cart';

const stateToProps = (state, props) => {
  // eslint-disable-next-line camelcase
  const { movie_id } = props.match.params;
  const movie = movieById(state, { movie_id });
  if (!movie) return {};
  const genres = genresBySlugs(state, movie.genre);
  return {
    movie,
    genres,
  };
};
const actionsToProps = (dispatch) => ({
  addToCart: (id) => dispatch(updateMovie(id, 1)),
  redirect: (to) => dispatch(push(to)),
});
class Main extends React.PureComponent {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    const { movie } = this.props;
    if (!movie) {
      const { redirect } = this.props;
      redirect('/error/404');
    }
  }

  addToCart() {
    const { addToCart, movie } = this.props;
    addToCart(movie.id);
  }

  render() {
    const { movie, genres } = this.props;
    if (!movie) {
      return null;
    }
    return (
      <div className="container">
        <div className="card-header">
          <h1>{movie.title}</h1>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col col-5">
              <img src={movie.image} className="img-fluid w-100" alt="Movie" />
            </div>
            <div className="col col-7">
              <div>{movie.description}</div>
              <div>
                {genres.map((genre) => (
                  <span key={genre.slug}>
                    <Link to={`/genre/${genre.slug}`}>{genre.name}</Link>
                    &nbsp;
                  </span>
                ))}
              </div>
              <div className="d-flex mt-3">
                <div className="fz-30 pt-1 mr-3">
                  {`${movie.price}$`}
                </div>
                <button type="button" className="btn btn-lg btn-primary" onClick={this.addToCart}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  redirect: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }),
  genres: PropTypes.arrayOf(PropTypes.object).isRequired,
};
Main.defaultProps = {
  movie: null,
};

export const Component = Main;
export default connect(
  stateToProps,
  actionsToProps,
)(Main);
