import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { genreBySlug } from '../../../core/selectors';

import Nav from './components/Nav';
import Movies from './components/Movies';

const stateToProps = (state, props) => {
  // eslint-disable-next-line camelcase
  const { genre_slug } = props.match.params;
  return {
    genre: genreBySlug(state, { genre_slug }),
  };
};
const actionsToProps = (dispatch) => ({
  redirect: (pathname) => dispatch(push(pathname)),
});

class Genre extends React.PureComponent {
  componentDidMount() {
    const { genre } = this.props;
    if (!genre) {
      const { redirect } = this.props;
      redirect('/error/404');
    }
  }

  render() {
    const { genre } = this.props;
    if (!genre) return null;
    return (
      <div className="d-flex">
        <div className="left-nav">
          <Nav genre={genre} />
        </div>
        <div className="flex-grow-1">
          <Movies genre={genre} />
        </div>
      </div>
    );
  }
}

Genre.propTypes = {
  redirect: PropTypes.func.isRequired,
  genre: PropTypes.shape({
    slug: PropTypes.string,
  }),
};
Genre.defaultProps = {
  genre: null,
};

export const Component = Genre;
export default connect(
  stateToProps,
  actionsToProps,
)(Genre);
