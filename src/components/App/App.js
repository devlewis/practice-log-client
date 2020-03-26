import React, { PureComponent } from "react";
import { Link, Route } from "react-router-dom";
import "./App.css";
import Home from "../Home/Home";
import Setup from "../Setup/Setup";
import DayList from "../DayList/DayList";
import DayForm from "../DayForm/DayForm";
import Context from "/Users/Devree/projects/practice-log-client/src/Context.js";
import AfterLogin from "../AfterLogin/AfterLogin";

class App extends PureComponent {
  state = {
    user: null,
    goals: [{ id: 1, num_of_days: 7 }],
    days: [
      {
        id: 1,
        date: "March 22",
        completed: "false",
        hours_goal: 2,
        default_goal: 2,
        technique: "Hanon",
        repertoire: "Prokofiev",
        goal_id: 1
      },
      {
        id: 2,
        date: "March 23",
        completed: "false",
        hours_goal: null,
        default_goal: 2,
        technique: "",
        repertoire: "",
        goal_id: 1
      },
      {
        id: 3,
        date: "March 24",
        completed: "false",
        hours_goal: null,
        default_goal: 2,
        technique: "",
        repertoire: "",
        goal_id: 1
      },
      {
        id: 4,
        date: "March 25",
        completed: "false",
        hours_goal: null,
        default_goal: 2,
        technique: "",
        repertoire: "",
        goal_id: 1
      },
      {
        id: 5,
        date: "March 26",
        completed: "false",
        hours_goal: null,
        default_goal: 2,
        technique: "",
        repertoire: "",
        goal_id: 1
      },
      {
        id: 6,
        date: "March 27",
        completed: "false",
        hours_goal: null,
        default_goal: 2,
        technique: "",
        repertoire: "",
        goal_id: 1
      },
      {
        id: 7,
        date: "March 28",
        completed: "false",
        hours_goal: null,
        default_goal: 2,
        technique: "",
        repertoire: "",
        goal_id: 1
      }
    ]
  };

  //   state = {
  //     days: {},
  //     num_of_days: 7
  //   }

  //   data => {
  //     data.length
  //   }

  // }

  handleLogin = () => {};

  onLoginSuccess = () => {
    fetch();
  };

  handleSubmit = () => {};

  handleSetDays = num_of_daysNew => {
    this.setState({
      goals: [{ id: 1, num_of_days: num_of_daysNew }]
    });
  };

  handleChangeCompleted = e => {
    this.setState({ days: [{ completed: e.target.value }] });
  };

  handleChangeTechnique = e => {
    this.setState({ technique: e.target.value });
  };

  handleChangeRepertoire = e => {
    this.setState({ repertoire: e.target.value });
  };

  render() {
    const value = {
      num_of_days: this.state.goals.num_of_days,
      days: this.state.days,
      user: this.state.user,
      handleLogin: this.handleLogin,
      onLoginSuccess: this.onLoginSuccess,
      handleSubmit: this.handleSubmit,
      handleSetDays: this.handleSetDays,
      handleChangeTechnique: this.handleChangeTechnique,
      handleChangeRepertoire: this.handleChangeRepertoire
    };

    return (
      <Context.Provider value={value}>
        <div className="App">
          <header className="App_header">
            <Link to="/">Practice Log</Link>
          </header>
          <Route
            exact
            path="/"
            render={({ history }) => {
              return <Home onClickSignIn={() => history.push("/afterlogin")} />;
            }}
          />
          <Route
            path="/setup"
            render={({ history }) => {
              return <Setup onClickCancel={() => history.push("/")} />;
            }}
          />
          <Route
            path="/daylist/:num_of_days"
            render={props => {
              const num_of_days = props.match.params.num_of_days;
              return (
                <DayList
                  num_of_days={this.state.goals.num_of_days}
                  days={this.state.days}
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
                  id={dayId}
                  handleChangeCompleted={this.handleChangeCompleted}
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
      </Context.Provider>
    );
  }
}

export default App;
