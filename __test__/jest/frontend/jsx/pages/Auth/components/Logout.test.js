/// <reference types="jest" />
import React from 'react';
import { shallow } from 'enzyme';

import {Component} from '../../../../../../../src/frontend/jsx/pages/Auth/Logout';

jest.useFakeTimers();

describe("components/pages/Auth/Logout", () => {
  let props;
  beforeEach(() => {
    props =  {
      authUserLogout: jest.fn(),
      redirect: jest.fn(),
    }
  });

  it("Renders the Logout", () => {
    expect.assertions(4);
    const wrapper = shallow(<Component {...props} />);
    expect(wrapper.text()).toContain('You are being logged out.');
    expect(props.authUserLogout).toHaveBeenCalled();
    expect(props.redirect).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(props.redirect).toHaveBeenCalled();

  });
});
