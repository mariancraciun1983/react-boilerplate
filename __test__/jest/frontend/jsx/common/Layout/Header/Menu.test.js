
/// <reference types="jest" />
import React from 'react';
import { render } from 'enzyme';

import { genericWrapper } from '../../../../../__mocks__/componentWrappers';
import { Component } from '../../../../../../../src/frontend/jsx/common/Layout/Header/Menu';

describe('components/common/Layout/Header', () => {
  let props;
  beforeEach(() => {
    props =  {
      cartMovies: 1,
      isAuthenticated: false,
      user: null,
    }
  });

  it('Shows the Menu - Guest', () => {
    expect.assertions(2);
    const wrapper = render(genericWrapper(<Component {...props}/>));
    expect(wrapper.text()).toContain('Login');
    expect(wrapper.text()).toContain('Signup');
  });

  it('Shows the Menu - User', () => {
    expect.assertions(2);
    props.isAuthenticated = true;
    props.user = {name: 'UserName'};
    const wrapper = render(genericWrapper(<Component {...props}/>));
    expect(wrapper.text()).toContain('UserName');
    expect(wrapper.text()).toContain('Logout');
  });


});
