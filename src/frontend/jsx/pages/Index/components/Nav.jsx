import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { genresList } from '../../../../core/selectors';

const stateToProps = (state) => ({
  genres: genresList(state),
});
class Nav extends React.PureComponent {
  render() {
    const { genres, genre } = this.props;
    return (
      <ul className="nav flex-column">
        <li className="nav-item">
          <div className="nav-link">
            <strong>Genres</strong>
          </div>
        </li>
        {genres.map((g) => {
          const active = (genre && genre.slug === g.slug);
          const classes = classnames({
            'nav-link': true,
            active,
          });
          return (
            <li className="nav-item" key={g.slug}>
              <Link className={classes} to={`/genre/${g.slug}`}>
                {g.name}
                { active ? '*' : ''}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }
}

Nav.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.object).isRequired,
  genre: PropTypes.shape({
    slug: PropTypes.string,
  }),
};
Nav.defaultProps = {
  genre: null,
};

export const Component = Nav;
export default connect(
  stateToProps,
  null,
)(Nav);
