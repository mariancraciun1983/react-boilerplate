/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
import { createSelector } from 'reselect';

export const appGetState = (state) => state.app.state;

export const authToken = (state) => state.auth.token;
export const authUser = (state) => state.auth.user;
export const authIsAuthenticated = (state) => state.auth.authenticated === true;

export const filtersString = (state) => state.filters.string;
export const filtersStringLower = (state) => state.filters.string_lower;

export const genresList = (state) => state.genres.list;

export const moviesList = (state) => state.movies.list;

export const cartSaved = (state) => state.cart.saved;
export const cartDict = (state) => state.cart.dict;

export const uiTheme = (state) => state.ui.theme;
export const uiLanguage = (state) => state.ui.language;
export const uiVersion = (state) => state.ui.version;

export const getProps = (state, props) => props;

export const filteredMovies = createSelector(
  moviesList, filtersStringLower,
  (movies, string_lower) => {
    if (!string_lower) return movies;
    return movies.filter((movie) => {
      if (movie.title_lower.indexOf(string_lower) === -1) {
        return false;
      }
      return true;
    });
  },
);

export const movieById = createSelector(
  moviesList, getProps,
  (movies, { movie_id }) => movies.find((movie) => movie.id === movie_id),
);
export const genreBySlug = createSelector(
  genresList, getProps,
  (genres, { genre_slug }) => genres.find((genre) => genre.slug === genre_slug),
);
export const genresBySlugs = createSelector(
  genresList, getProps,
  (genres, slugs) => genres.filter((genre) => slugs.indexOf(genre.slug) !== -1),
);

export const cartItems = createSelector(
  [moviesList, cartDict],
  ((movies, cart) => {
    const list = [];
    movies.forEach((prod) => {
      if (Object.prototype.hasOwnProperty.call(cart, prod.id)) {
        list.push({
          movie: prod,
          quantity: cart[prod.id],
        });
      }
    });
    return list;
  }),
);

export const cartTotal = createSelector(
  [cartItems],
  ((items) => {
    const total = items.reduce((accum, item) => accum + (item.movie.price * item.quantity), 0);
    return total;
  }),
);
