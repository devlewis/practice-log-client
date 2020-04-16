import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import NotFoundPage from "./NotFoundPage";

describe(`NotFoundPage component`, () => {
  const props = {
    className: "test-class-name",
    children: <p>test children</p>,
    "data-other": "test-other-prop",
  };

  it("renders form.NotFoundPage by default", () => {
    const wrapper = shallow(<NotFoundPage />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders the NotFoundPage given props", () => {
    const wrapper = shallow(<NotFoundPage {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
