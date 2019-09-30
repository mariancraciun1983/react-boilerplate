/// <reference types="jest" />
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import {Component} from '../../../../../../../src/frontend/jsx/pages/Index/components/Movie';
import { genericWrapper } from '../../../../../__mocks__/componentWrappers';
import mock from '../../../../../__mocks__/store';

describe("components/pages/Index/components/Movie", () => {
  let props;
  beforeEach(() => {
    props =  {
      addToCart: jest.fn(),
      movie: mock.fullStore.movies.list[0],
    }
  });

  it("Renders Correctly", () => {
    expect.assertions(1);
    const tree = renderer
    .create(genericWrapper(<Component {...props}/>))
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Handles ordering", () => {
    expect.assertions(1);
    const rendered = mount(genericWrapper(<Component {...props}/>));
    rendered.find('button').at(0).simulate('click')
    expect(props.addToCart).toHaveBeenCalledWith(props.movie.id);
  });


});
