/// <reference types="jest" />
import React from 'react';
import { shallow } from 'enzyme';

import Errors from '../../../../../../src/frontend/jsx/pages/Errors';

describe("components/pages/Errors", () => {
  it("Shows Auth routes", () => {
    expect.assertions(2);
    const wrapper = shallow(<Errors.routes />);
    expect(wrapper.find("Route")).toHaveLength(1);
    expect(wrapper.find("Redirect")).toHaveLength(1);
  });
});
