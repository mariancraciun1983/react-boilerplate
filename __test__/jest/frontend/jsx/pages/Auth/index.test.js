/// <reference types="jest" />
import React from 'react';
import { shallow } from 'enzyme';

import Auth from '../../../../../../src/frontend/jsx/pages/Auth';

describe("components/pages/Auth", () => {
  it("Shows Auth routes", () => {
    expect.assertions(2);
    const wrapper = shallow(<Auth.routes />);
    expect(wrapper.find("Route")).toHaveLength(3);
    expect(wrapper.find("Redirect")).toHaveLength(1);
  });
});
