/// <reference types="jest" />
import React from 'react';
import { render } from 'enzyme';

import {Component} from '../../../../../../src/frontend/jsx/pages/Errors/Error404';

describe("components/pages/Errors/Error404", () => {
  it("Renders the Error", () => {
    expect.assertions(1);
    const wrapper = render(<Component />);
    expect(wrapper.text()).toContain('404');
  });
});
