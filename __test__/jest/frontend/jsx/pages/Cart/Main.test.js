/// <reference types="jest" />
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import {Component} from '../../../../../../src/frontend/jsx/pages/Cart/Main';
import { genericWrapper } from '../../../../__mocks__/componentWrappers';

describe("components/pages/Cart/Main", () => {
  let props;
  beforeEach(() => {
    props =  {
      updateCartMovie: jest.fn(),
      saveCart: jest.fn(),
      redirect: jest.fn(),
      saved: true,
      items: [],
      total: 10,
      isAuthenticated: true,
    }
  });

  it("Renders the cart", () => {
    expect.assertions(1);
    const tree = renderer
    .create(genericWrapper(<Component {...props} />))
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Handles cart updates", () => {
    expect.assertions(1);
    const wrapper  = shallow(<Component {...props} />)
    wrapper.instance().onUpdateMovie('PROD_ID', 2);
    expect(props.updateCartMovie).toHaveBeenCalledWith('PROD_ID', 2);
  });

  it("Handles cart submission", () => {
    expect.assertions(3);
    let wrapper  = shallow(<Component {...props} />)
    wrapper.instance().onSave();
    expect(props.saveCart).toHaveBeenCalled();

    wrapper  = shallow(<Component {...props} isAuthenticated={false} />)
    wrapper.instance().onSave();
    expect(props.saveCart).toHaveBeenCalledTimes(1);//previouly
    expect(props.redirect).toHaveBeenCalled();
  });

});
