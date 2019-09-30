/// <reference types="jest" />
import React from 'react';
import { shallow } from 'enzyme';

import Movie from '../../../../../../src/frontend/jsx/pages/Movie';

describe("components/pages/Movie", () => {

  it("Shows Movie route", () => {
    expect.assertions(2);
    const wrapper = shallow(<Movie.routes />);
    expect(wrapper.find("Route")).toHaveLength(1);
    expect(wrapper.children()).toHaveLength(1);
  });

});
