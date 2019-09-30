/// <reference types="jest" />
import React from 'react';
import { shallow } from 'enzyme';

import Index from '../../../../../../src/frontend/jsx/pages/Index';

describe("components/pages/Cart", () => {
  it("Shows Cart index route", () => {
    expect.assertions(2);
    const wrapper = shallow(<Index.indexRoutes />);
    expect(wrapper.find("Route")).toHaveLength(1);
    expect(wrapper.children()).toHaveLength(1);
  });

  it("Shows Cart genre route", () => {
    expect.assertions(2);
    const wrapper = shallow(<Index.genreRoutes />);
    expect(wrapper.find("Route")).toHaveLength(1);
    expect(wrapper.children()).toHaveLength(1);
  });

});
