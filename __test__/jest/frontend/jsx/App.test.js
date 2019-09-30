/// <reference types="jest" />
import React from 'react';
import { shallow } from 'enzyme';

import { Component } from '../../../../src/frontend/jsx/App';

describe('components/App', () => {
  let props =  {};
  beforeEach(() => {
    props = {
      appState: "loading",
      history: {push: jest.fn()},
      version: 0 ,
      initialize: jest.fn()
    }
  });

  it('Shows the loading state and status', () => {
    expect.assertions(1);

    const wrapper = shallow(<Component {...props} appState="loading"/>);
    expect(wrapper.find('.Loading')).toHaveLength(1);
  });

  it('Shows the error state and status', () => {
    expect.assertions(1);
    const wrapper = shallow(<Component {...props}  appState="error"/>);
    expect(wrapper.find('.Error')).toHaveLength(1);
  });

  it('Shows the loaded states', () => {
    expect.assertions(2);
    const wrapper = shallow(<Component {...props}  appState="loaded"/>);
    expect(wrapper.find('Router')).toHaveLength(1);
    expect(wrapper.find('Route')).toHaveLength(1);
  });

  it('Calls initialize', () => {
    expect.assertions(1);
    const initialize = jest.fn();
    shallow(<Component {...props} initialize={initialize} />);
    expect(initialize.mock.calls).toHaveLength(1);
  });

  it('Handles custom updating', () => {
    expect.assertions(3);
    const wrapper = shallow(<Component {...props} />);
    expect(wrapper.instance().shouldComponentUpdate({...props})).toBeFalsy();
    expect(wrapper.instance().shouldComponentUpdate({...props, version: 1})).toBeTruthy();
    expect(wrapper.instance().shouldComponentUpdate({...props, appState: "error"})).toBeTruthy();
  });

});
