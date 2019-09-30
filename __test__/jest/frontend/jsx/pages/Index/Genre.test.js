/// <reference types="jest" />
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import {Component} from '../../../../../../src/frontend/jsx/pages/Index/Genre';
import { genericWrapper } from '../../../../__mocks__/componentWrappers';

import mock from '../../../../__mocks__/store';


describe("components/pages/Index/Genre", () => {
  let props;
  beforeEach(() => {
    props =  {
      redirect: jest.fn(),
      genre: mock.fullStore.genres.list[0],
    }
  });
  it("Renders Correctly", () => {
    expect.assertions(1);
    const tree = renderer
    .create(genericWrapper(<Component {...props}/>))
    .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Handles bad genre", () => {
    expect.assertions(1);
    shallow(<Component {...props} genre={null}/>);
    expect(props.redirect).toHaveBeenCalledWith('/error/404');
  });

});
