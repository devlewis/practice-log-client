import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import DayForm from "./DayForm";
import Context from "../../Context";

let value = {
  days: [
    {
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
    },
    {
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
    },
  ],
};

describe(`DayForm component`, () => {
  const props = {
    location: { pathname: "/dayform/3" },
    history: { goBack: () => {} },
    className: "test-class-name",
    children: <p>test children</p>,
    "data-other": "test-other-prop",
  };

  it("renders a form.DayForm by default", () => {
    const wrapper = shallow(<DayForm />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders the DayForm given props", () => {
    const wrapper = mount(
      <Context.Provider value={value}>
        <DayForm {...props} />
      </Context.Provider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
