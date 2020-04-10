import React, { PureComponent } from "react";
import { Link, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "../Home/Home";
import Setup from "../Setup/Setup";
import DayList from "../DayList/DayList";
import DayForm from "../DayForm/DayForm";
import Context from "/Users/Devree/projects/practice-log-client/src/Context.js";
import AfterLogin from "../AfterLogin/AfterLogin";
import PrivateRoute from "../Utils/PrivateRoute";
import PublicOnlyRoute from "../Utils/PublicOnlyRoute";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import DaysApiService from "../../services/days-api-service";

class App extends PureComponent {
  state = {
    user: null,
    days: [],
    num_of_days: null,
    total_hours: 0,
    hours_goal: null,
    goal_id: null,
  };

  handleLoginFetch = (history) => {
    DaysApiService.getGoal().then((goal) => {
      console.log(goal);

      this.setState({
        user: goal.user_id,
        num_of_days: goal.num_of_days,
        total_hours: goal.total_hours,
        hours_goal: goal.hours_goal,
        goal_id: goal.id,
      });
    });

    DaysApiService.getDays()
      .then((days) => {
        console.log(days);

        this.setState({
          days: days,
        });
      })
      .then(() => history.push(`/daylist/${this.state.num_of_days}`));
  };

  handleSubmit = (num_of_days, hours, user, history) => {
    DaysApiService.postDays(num_of_days, hours, user)
      .then((days) => {
        console.log(days);

        this.setState({
          days: days,
          user: user,
          num_of_days: num_of_days,
          hours_goal: parseFloat(hours),
        });
      })
      .then(() => history.push(`/daylist/${this.state.num_of_days}`));
  };

  handleDaySubmit = (updatedDay, dayId, history) => {
    let hours;
    if (updatedDay.completed === "true") {
      hours = this.state.total_hours + updatedDay.actual_hours;
    } else {
      hours = this.state.total_hours;
      updatedDay.actual_hours = 0;
    }

    this.setState({
      total_hours: hours,
    });

    console.log("updatedDay in client", updatedDay);
    console.log("dayId in client", dayId);

    DaysApiService.updateDay(dayId, updatedDay).then(() => {
      console.log("SERVER??");
    });

    DaysApiService.getDays().then((days) => {
      console.log(days);

      this.setState({
        days: days,
      });
    });
  };

  updateDataGoal = () => {
    const updatedGoal = {
      num_of_days: this.state.num_of_days,
      hours_goal: this.state.hours_goal,
      total_hours: this.state.total_hours,
    };
    const goalId = this.state.goal_id;
    debugger;
    DaysApiService.updateGoal(updatedGoal, goalId).then((res) =>
      console.log(res)
    );
  };

  render() {
    const value = {
      user: this.state.user,
      days: this.state.days,
      num_of_days: this.state.num_of_days,
      total_hours: this.state.total_hours,
      hours_goal: this.state.hours_goal,
      onHandleSubmit: this.handleSubmit,
      onHandleDaySubmit: this.handleDaySubmit,
      onHandleLoginFetch: this.handleLoginFetch,
      updateDataGoal: this.updateDataGoal,
    };
    return (
      <Context.Provider value={value}>
        <div className="App">
          <header className="App_header">
            <Link to="/">Practice Log</Link>
          </header>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <PrivateRoute path="/setup" component={Setup} />

            <PrivateRoute path="/daylist/" component={DayList} />

            <PrivateRoute path="/day/:dayNum" component={DayForm} />

            <PrivateRoute path="/afterlogin" component={AfterLogin} />

            <PublicOnlyRoute path="/register" component={RegistrationForm} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Context.Provider>
    );
  }
}

export default App;
