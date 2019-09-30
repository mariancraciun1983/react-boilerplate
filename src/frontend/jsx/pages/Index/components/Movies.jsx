import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Movie from './Movie';

import { moviesByOptionalGenre } from '../utils/selectors';

const stateToProps = (state, props) => {
  const { genre } = props;
  return {
    movies: moviesByOptionalGenre(state, { genre }),
  };
};
class Movies extends React.PureComponent {
  render() {
    const { movies } = this.props;
    return (
      <div className="row">
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>
    );
  }
}

Movies.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export const Component = Movies;
export default connect(
  stateToProps,
  null,
)(Movies);
