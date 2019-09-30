/// <reference types="jest" />
import React, {Fragment} from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import { genericWrapper } from '../../../../__mocks__/componentWrappers';

import { Component } from '../../../../../../src/frontend/jsx/common/Layout';

describe('components/common', () => {
  it('Shows the Layout', () => {
    expect.assertions(2);
    const wrapper = shallow(<Component><Fragment /></Component>);
    expect(wrapper.find('Header')).toHaveLength(1);
    expect(wrapper.find('Footer')).toHaveLength(1);
  });


  it('Renders the Header correctly', () => {
    expect.assertions(1);
    const tree = renderer
    .create(genericWrapper(<Component><Fragment /></Component>))
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

});
