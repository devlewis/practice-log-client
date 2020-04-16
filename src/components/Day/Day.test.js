import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Day from "./Day";

describe(`Day component`, () => {
  const props1 = {
    id: 1,
    day_num: 1,
    date: "March 22",
    completed: "false",
    technique: "",
    repertoire: "",
    actual_hours: 0,
    touched: false,
    goal_id: 1,
    user_id: 1,
    goal_hours: 3,
  };

  const props2 = {
    id: 2,
    day_num: 2,
    date: "March 23",
    completed: "true",
    technique: "Hanon",
    repertoire: "",
    actual_hours: 2,
    touched: true,
    goal_id: 1,
    user_id: 1,
    goal_hours: 3,
  };

  it("renders a .Day by default", () => {
    const wrapper = shallow(<Day />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders the Day given props of untouched", () => {
    const wrapper = shallow(<Day {...props1} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders the Day given props of touched", () => {
    const wrapper = shallow(<Day {...props2} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
