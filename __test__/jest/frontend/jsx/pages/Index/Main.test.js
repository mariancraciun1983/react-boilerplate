/// <reference types="jest" />
import React from 'react';
import renderer from 'react-test-renderer';

import {Component} from '../../../../../../src/frontend/jsx/pages/Index/Main';
import { genericWrapper } from '../../../../__mocks__/componentWrappers';

describe("components/pages/Index/Main", () => {
  it("Renders Correctly", () => {
    expect.assertions(1);
    const tree = renderer
    .create(genericWrapper(<Component />))
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

});
