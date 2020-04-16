import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import DayList from "./DayList";
import Context from "../../Context";
import { Route, BrowserRouter } from "react-router-dom";

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
  total_hours: 5,
  hours_goal: 3,
  num_of_days: 2,
};

describe(`DayList component`, () => {
  const props = {
    className: "test-class-name",
    children: <p>test children</p>,
    "data-other": "test-other-prop",
  };

  it("renders a list DayList by default", () => {
    const wrapper = mount(
      <BrowserRouter>
        <Route>
          <Context.Provider value={value}>
            <DayList />
          </Context.Provider>
        </Route>{" "}
      </BrowserRouter>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it("renders a list DayList given props", () => {
    const wrapper = mount(
      <BrowserRouter>
        <Route>
          <Context.Provider value={value}>
            <DayList {...props} />
          </Context.Provider>
        </Route>
      </BrowserRouter>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
