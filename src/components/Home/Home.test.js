import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Home from "./Home";

describe(`Home component`, () => {
  const props = {
    className: "test-class-name",
    children: <p>test children</p>,
    "data-other": "test-other-prop",
  };

  it("renders form.Home by default", () => {
    const wrapper = shallow(<Home />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders the Home given props", () => {
    const wrapper = shallow(<Home {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
