import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import RegistrationForm from "./RegistrationForm";

describe(`RegistrationForm component`, () => {
  const props = {
    className: "test-class-name",
    children: <p>test children</p>,
    "data-other": "test-other-prop",
  };

  it("renders form.RegistrationForm by default", () => {
    const wrapper = shallow(<RegistrationForm />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders the RegistrationForm given props", () => {
    const wrapper = shallow(<RegistrationForm {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
