/// <reference types="jest" />
import React from 'react';
import { shallow } from 'enzyme';

import Cart from '../../../../../../src/frontend/jsx/pages/Cart';

describe("components/pages/Cart", () => {

  it("Shows Cart routes", () => {
    expect.assertions(2);
    const wrapper = shallow(<Cart.routes />);
    expect(wrapper.find("Route")).toHaveLength(1);
    expect(wrapper.find("Redirect")).toHaveLength(1);
  });
});
