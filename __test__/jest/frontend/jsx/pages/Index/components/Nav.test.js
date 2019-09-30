/// <reference types="jest" />
import React from 'react';
import renderer from 'react-test-renderer';

import {Component} from '../../../../../../../src/frontend/jsx/pages/Index/components/Nav';
import { genericWrapper } from '../../../../../__mocks__/componentWrappers';
import mock from '../../../../../__mocks__/store';

describe("components/pages/Index/components/Main", () => {
  let props;
  beforeEach(() => {
    props =  {
      genres: mock.fullStore.genres.list,
      genre: null,
    }
  });

  it("Renders Correctly", () => {
    expect.assertions(1);
    const tree = renderer
    .create(genericWrapper(<Component {...props}/>))
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Renders Correctly - Selected", () => {
    expect.assertions(1);
    const tree = renderer
    .create(genericWrapper(<Component {...props} genre={props.genres[1]} />))
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

});
