import React, { PureComponent } from "react";
import { Link, Route } from "react-router-dom";
import "./App.css";
import Home from "../Home/Home";
import Setup from "../Setup/Setup";
import DayList from "../DayList/DayList";
import DayForm from "../DayForm/DayForm";
//import Context from "/Users/Devree/projects/practice-log-client/src/Context.js";
import AfterLogin from "../AfterLogin/AfterLogin";
import days100 from "/Users/Devree/projects/practice-log-client/src/STORE.js";

class App extends PureComponent {
  state = {
    user: null,
    days: [],
    num_of_days: null,
    total_hours: 0,
    hours_goal: null
  };

  handleLogin = () => {};

  onLoginSuccess = () => {
    fetch();
  };

  handleSubmit = (num_of_days, hours, start_date) => {
    let newDays = days100.slice(0, num_of_days);
    newDays.forEach(day => (day.actual_hours = hours));

    this.setState({
      days: newDays,
      num_of_days: num_of_days,
      hours_goal: hours
    });
  };

  handleDaySubmit = updatedDay => {
    let hours;
    if (updatedDay.completed === "true") {
      hours = this.state.total_hours + updatedDay.actual_hours;
    } else {
      hours = this.state.total_hours;
      updatedDay.actual_hours = 0;
    }
    this.setState({
      days: this.state.days.map(day =>
        day.id !== updatedDay.id ? day : updatedDay
      ),
      total_hours: hours
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App_header">
          <Link to="/">Practice Log</Link>
        </header>
        <Route
          exact
          path="/"
          render={({ history }) => {
            return (
              <Home
                onClickSignIn={() => history.push("/afterlogin")}
                onClickSetup={() => history.push("/setup")}
              />
            );
          }}
        />
        <Route
          path="/setup"
          render={({ history }) => {
            return (
              <Setup
                onHandleSubmit={this.handleSubmit}
                onClickCancel={() => history.push("/")}
                history={history}
              />
            );
          }}
        />
        <Route
          path="/daylist/:num_of_days"
          render={props => {
            const num_of_days = props.match.params.num_of_days;
            return (
              <DayList
                num_of_days={num_of_days}
                days={this.state.days}
                total_hours={this.state.total_hours}
                goal_hours={this.state.hours_goal}
              />
            );
          }}
        />
        <Route
          path="/day/:dayId"
          render={props => {
            const dayId = props.match.params.dayId;
            return (
              <DayForm
                day={this.state.days[dayId - 1]}
                id={dayId}
                hours={this.state.hours_goal}
                handleDaySubmit={this.handleDaySubmit}
                onClickCancel={() => props.history.push("/")}
                goBack={() =>
                  props.history.push(`/daylist/${this.state.num_of_days}`)
                }
              />
            );
          }}
        />
        <Route
          path="/afterlogin"
          render={({ history }) => {
            return (
              <AfterLogin
                onClickCurrent={() => history.push("/daylist/:dayid")}
                onClickSetup={() => history.push("/setup")}
              />
            );
          }}
        />
      </div>
    );
  }
}

export default App;
