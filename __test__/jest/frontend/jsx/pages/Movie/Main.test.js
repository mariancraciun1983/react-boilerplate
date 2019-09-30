/// <reference types="jest" />
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';

import {Component} from '../../../../../../src/frontend/jsx/pages/Movie/Main';
import { genericWrapper } from '../../../../__mocks__/componentWrappers';

import mock from '../../../../__mocks__/store';


describe("components/pages/Movie/Main", () => {
  let props;
  beforeEach(() => {
    props =  {
      redirect: jest.fn(),
      addToCart: jest.fn(),
      movie: mock.fullStore.movies.list[0],
      genres: mock.fullStore.genres.list.splice(3),
    }
  });

  it("Renders Correctly", () => {
    expect.assertions(1);
    const tree = renderer
    .create(genericWrapper(<Component {...props}/>))
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Handles add movie to cart", () => {
    expect.assertions(1);
    const rendered = mount(genericWrapper(<Component {...props}/>));
    rendered.find('button').at(0).simulate('click')
    expect(props.addToCart).toHaveBeenCalledWith(props.movie.id);
  });

  it("Handles bad movie", () => {
    expect.assertions(1);
    shallow(<Component {...props} movie={null}/>);
    expect(props.redirect).toHaveBeenCalledWith('/error/404');
  });

});
