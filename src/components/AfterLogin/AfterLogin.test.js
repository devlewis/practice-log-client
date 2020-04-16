import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import AfterLogin from "./AfterLogin";

describe(`AfterLogin component`, () => {
  const props = {
    className: "test-class-name",
    children: <p>test children</p>,
    "data-other": "test-other-prop",
  };

  it("renders form.AfterLogin by default", () => {
    const wrapper = shallow(<AfterLogin />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders the AfterLogin given props", () => {
    const wrapper = shallow(<AfterLogin {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
