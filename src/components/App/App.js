import React, { PureComponent } from "react";
import { Link, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "../Home/Home";
import Setup from "../Setup/Setup";
import DayList from "../DayList/DayList";
import DayForm from "../DayForm/DayForm";
import Context from "/Users/Devree/projects/practice-log-client/src/Context.js";
//import AfterLogin from "../AfterLogin/AfterLogin";
import PrivateRoute from "../Utils/PrivateRoute";
import PublicOnlyRoute from "../Utils/PublicOnlyRoute";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import DaysApiService from "../../services/days-api-service";
import TokenService from "../../services/token-service";
import AuthApiService from "../../services/auth-api-service";
import IdleService from "../../services/idle-service";

class App extends PureComponent {
  state = {
    user: null,
    days: [],
    num_of_days: null,
    total_hours: 0,
    hours_goal: null,
    goal_id: null,
  };

  componentDidMount() {
    /*
      set the function (callback) to call when a user goes idle
      we'll set this to logout a user when they're idle
    */
    IdleService.setIdleCallback(this.logoutFromIdle);

    /* if a user is logged in */
    if (TokenService.hasAuthToken()) {
      /*
        tell the idle service to register event listeners
        the event listeners are fired when a user does something, e.g. move their mouse
        if the user doesn't trigger one of these event listeners,
          the idleCallback (logout) will be invoked
      */
      IdleService.registerIdleTimerResets();

      /*
        Tell the token service to read the JWT, looking at the exp value
        and queue a timeout just before the token expires
      */
      TokenService.queueCallbackBeforeExpiry(() => {
        /* the timoue will call this callback just before the token expires */
        console.log("queueCallbackBeforeExpiry");
        AuthApiService.postRefreshToken();
      });
    }
  }

  componentWillUnmount() {
    /*
      when the app unmounts,
      stop the event listeners that auto logout (clear the token from storage)
    */
    IdleService.unRegisterIdleResets();
    /*
      and remove the refresh endpoint request
    */
    TokenService.clearCallbackBeforeExpiry();
  }

  logoutFromIdle = () => {
    console.log("loggedout from Idle!");
    /* remove the token from localStorage */
    TokenService.clearAuthToken();
    /* remove any queued calls to the refresh endpoint */
    TokenService.clearCallbackBeforeExpiry();
    /* remove the timeouts that auto logout when idle */
    IdleService.unRegisterIdleResets();
    /*
      react won't know the token has been removed from local storage,
      so we need to tell React to rerender
    */
    this.forceUpdate();
  };

  handleLoginFetch = (history) => {
    DaysApiService.getGoal().then((goal) => {
      if (goal.length === 0) {
        return history.push("/setup");
      } else {
        this.setState({
          user: goal.user_id,
          num_of_days: goal.num_of_days,
          total_hours: goal.total_hours,
          hours_goal: parseFloat(goal.hours_goal),
          goal_id: goal.id,
        });
        if (this.state.goal_id) {
          DaysApiService.getDays()
            .then((days) => {
              this.setState({
                days: days,
              });
            })
            .then(() => history.push(`/daylist/${this.state.num_of_days}`));
        }
      }
    });
  };

  handleSubmit = (num_of_days, hours, history) => {
    DaysApiService.postDays(num_of_days, hours)
      .then((days) => {
        this.setState({
          days: days,
          num_of_days: num_of_days,
          hours_goal: parseFloat(hours),
          total_hours: 0,
        });
      })
      .then(() => history.push(`/daylist/${this.state.num_of_days}`));
  };

  handleDaySubmit = (updatedDay, dayId, history) => {
    let hours;
    if (updatedDay.completed === "true") {
      hours = this.state.total_hours + parseFloat(updatedDay.actual_hours);
    } else {
      hours = this.state.total_hours;
      updatedDay.actual_hours = 0;
    }

    this.setState({
      total_hours: hours,
    });

    DaysApiService.updateDay(dayId, updatedDay).then(() => {});

    DaysApiService.getDays().then((days) => {
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

    DaysApiService.updateGoal(updatedGoal, goalId);
  };

  render() {
    const value = {
      user: this.state.user,
      days: this.state.days,
      num_of_days: this.state.num_of_days,
      total_hours: this.state.total_hours,
      hours_goal: this.state.hours_goal,
      goal_id: this.state.goal_id,
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
            <PublicOnlyRoute exact path="/" component={Home} />

            <PrivateRoute path="/setup" component={Setup} />

            <PrivateRoute path="/day/:dayNum" component={DayForm} />

            <PrivateRoute path="/daylist" component={DayList} />

            {/* <PrivateRoute path="/afterlogin" component={AfterLogin} /> */}

            <Route path="/register" component={RegistrationForm} />

            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Context.Provider>
    );
  }
}

export default App;
