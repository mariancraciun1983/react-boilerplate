/// <reference types="jest" />
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import {Component} from '../../../../../../../src/frontend/jsx/pages/Cart/components/Item';
import mock from '../../../../../__mocks__/store';
describe("components/pages/Cart/components/Item", () => {
  let props;
  beforeEach(() => {
    props =  {
      onUpdate: jest.fn(),
      movie: mock.fullStore.movies.list[0],
      quantity: 1,
    }
  });
  it("Renders the Item", () => {
    expect.assertions(1);
    const tree = renderer
    .create(<Component {...props} />)
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Handles Changes", () => {
    expect.assertions(2);
    const wrapper  = shallow(<Component {...props} />)
    wrapper.find('input').at(0).simulate('change', {target: {value: '12'}})
    expect(props.onUpdate).toHaveBeenCalledWith(props.movie.id, 12);

    wrapper.find('button').at(0).simulate('click')
    expect(props.onUpdate).toHaveBeenCalledWith(props.movie.id, 0);

  });


});
