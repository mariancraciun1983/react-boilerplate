/// <reference types="jest" />
import React from 'react';
import { shallow } from 'enzyme';

import { Component } from '../../../../src/frontend/jsx/Routes';

describe("components/Routes", () => {
  let props = {};
  beforeEach(() => {
    props = {
      location: { pathname: "/", search: "", hash: "" }
    };
  });

  it("Shows the loaded state", () => {
    expect.assertions(3);
    const wrapper = shallow(<Component {...props} appState="loaded" />);
    expect(wrapper.find("Layout")).toHaveLength(1);
    expect(wrapper.find("Switch")).toHaveLength(1);
    expect(wrapper.find("Route")).toHaveLength(8);
  });
});
