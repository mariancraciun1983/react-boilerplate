/// <reference types="jest" />
import React from 'react';
import renderer from 'react-test-renderer';

import {Component} from '../../../../../../../src/frontend/jsx/pages/Index/components/Movies';
import { genericWrapper } from '../../../../../__mocks__/componentWrappers';
import mock from '../../../../../__mocks__/store';

describe("components/pages/Index/components/Movies", () => {
  let props;
  beforeEach(() => {
    props =  {
      movies: mock.fullStore.movies.list,
    }
  });

  it("Renders Correctly", () => {
    expect.assertions(1);
    const tree = renderer
    .create(genericWrapper(<Component {...props}/>))
    .toJSON();
    expect(tree).toMatchSnapshot();
  });


});
