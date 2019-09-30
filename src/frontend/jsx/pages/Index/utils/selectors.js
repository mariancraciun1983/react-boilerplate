/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';
import { filteredMovies, getProps } from '../../../../core/selectors';

export const moviesByOptionalGenre = createSelector(
  filteredMovies,
  getProps,
  (movies, { genre }) => {
    if (!genre) return movies;
    return movies.filter((movie) => movie.genre.indexOf(genre.slug) !== -1);
  },
);
