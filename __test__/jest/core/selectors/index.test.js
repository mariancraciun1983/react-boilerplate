/* eslint-disable arrow-body-style */
import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';
expect.extend({toBeDeepCloseTo});

import * as selectors from '../../../../src/frontend/core/selectors';

import stateData from '../../__mocks__/stateMock';

describe('selectors', () => {
  it('static', () => {
    expect.assertions(14);
    expect(selectors.appGetState(stateData)).toEqual("loaded");
    expect(selectors.authToken(stateData)).toEqual("abc123");
    expect(selectors.authUser(stateData)).toEqual(stateData.auth.user);
    expect(selectors.authIsAuthenticated(stateData)).toEqual(stateData.auth.authenticated);
    expect(selectors.filtersString(stateData)).toEqual("Lo");
    expect(selectors.filtersStringLower(stateData)).toEqual("lo");
    expect(selectors.genresList(stateData)).toEqual(stateData.genres.list);
    expect(selectors.moviesList(stateData)).toEqual(stateData.movies.list);
    expect(selectors.cartSaved(stateData)).toEqual(stateData.cart.saved);
    expect(selectors.cartDict(stateData)).toEqual(stateData.cart.dict);
    expect(selectors.uiTheme(stateData)).toEqual(stateData.ui.theme);
    expect(selectors.uiLanguage(stateData)).toEqual(stateData.ui.language);
    expect(selectors.uiVersion(stateData)).toEqual(stateData.ui.version);
    expect(selectors.getProps({}, { 1: 1 })).toEqual({ 1: 1 });
  });

  it('filteredMovies', () => {
    expect.assertions(2);
    const movies = selectors.moviesList(stateData);
    const string_lower = 'lost';
    const expected = [movies[0],movies[2]]
    expect(selectors.filteredMovies.resultFunc(movies,string_lower)).toEqual(expected);
    expect(selectors.filteredMovies.resultFunc(movies,'')).toEqual(movies);
  });

  it('movieById', () => {
    expect.assertions(1);
    const movies = selectors.moviesList(stateData);
    const movie_id = "f01187b5-6fe8-465b-a0b8-3764a94ae225";
    const expected = movies[1];
    expect(selectors.movieById.resultFunc(movies,{movie_id})).toEqual(expected);
  });
  it('genreBySlug', () => {
    expect.assertions(1);
    const genres = selectors.genresList(stateData);
    const genre_slug = "comedy";
    const expected = genres[0];
    expect(selectors.genreBySlug.resultFunc(genres,{genre_slug})).toEqual(expected);
  });
  it('genresBySlugs', () => {
    expect.assertions(1);
    const genres = selectors.genresList(stateData);
    const slugs = ["comedy","adventure"];
    const expected = [genres[0],genres[1]];
    expect(selectors.genresBySlugs.resultFunc(genres,slugs)).toEqual(expected);
  });
  it('cartItems', () => {
    expect.assertions(1);
    const movies = selectors.moviesList(stateData);
    const cartDict = selectors.cartDict(stateData);
    const expected = [
      {movie: movies[0], quantity: 1},
      {movie: movies[2], quantity: 2}
    ]
    expect(selectors.cartItems.resultFunc(movies,cartDict)).toEqual(expected);
  });
  it('cartTotal', () => {
    expect.assertions(1);
    const cartItems = selectors.cartItems(stateData);
    const expected = 17.19;
    expect(selectors.cartTotal.resultFunc(cartItems)).toBeDeepCloseTo(expected, 2);
  });
});
