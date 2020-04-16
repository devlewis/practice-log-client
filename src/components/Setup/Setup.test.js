import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Setup from "./Setup";

describe(`Setup component`, () => {
  const props = {
    className: "test-class-name",
    children: <p>test children</p>,
    "data-other": "test-other-prop",
  };

  it("renders form.Setup by default", () => {
    const wrapper = shallow(<Setup />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders the Setup given props", () => {
    const wrapper = shallow(<Setup {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
