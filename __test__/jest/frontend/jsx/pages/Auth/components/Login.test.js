/// <reference types="jest" />
import React from 'react';
import renderer from 'react-test-renderer';

import {Component} from '../../../../../../../src/frontend/jsx/pages/Auth/Login';
import { genericWrapper } from '../../../../../__mocks__/componentWrappers';


describe("components/pages/Auth/Login", () => {
  let props;
  beforeEach(() => {
    props =  {
      isAuthenticated: false,
      authDataSet: jest.fn(),
      redirect: jest.fn(),
    }
  });

  it("Renders the Login", () => {
    //it's not trivial to test, so we will just test it how well it renders
    expect.assertions(1);
    const tree = renderer
    .create(genericWrapper(<Component {...props} />))
    .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
