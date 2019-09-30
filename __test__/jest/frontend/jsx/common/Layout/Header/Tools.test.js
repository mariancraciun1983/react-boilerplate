/// <reference types="jest" />
import React from 'react';
import { shallow, render } from 'enzyme';

import { genericWrapper } from '../../../../../__mocks__/componentWrappers';
import { Component } from '../../../../../../../src/frontend/jsx/common/Layout/Header/Tools';

describe('components/common/Layout/Header', () => {
  let props;
  beforeEach(() => {
    props =  {
      theme: 'light',
      language: 'en',
      setTheme: jest.fn(),
      setLanguage: jest.fn(),
    }
  });

  it('Shows the Tools', () => {
    expect.assertions(2);
    const wrapper = render(genericWrapper(<Component {...props}/>));
    const text = wrapper.text();
    expect(text).toContain('Dark Version');
    expect(text).toContain('ES');
  });

  it('Handles toggles', () => {
    expect.assertions(2);
    const wrapper = shallow(<Component {...props}/>);

    wrapper.find('button').at(0).simulate('click');
    expect(props.setTheme.mock.calls).toHaveLength(1);

    wrapper.find('button').at(1).simulate('click');
    expect(props.setLanguage.mock.calls).toHaveLength(1);
  });



});
