import React, { PureComponent } from "react";
import { Link, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "../Home/Home";
import Setup from "../Setup/Setup";
import DayList from "../DayList/DayList";
import DayForm from "../DayForm/DayForm";
import Context from "../../Context.js";
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
    error: null,
    user: null,
    days: [],
    num_of_days: null,
    total_hours: 0,
    hours_goal: null,
    goal_id: null,
  };

  componentDidMount() {
    //set the function (callback) to call when a user goes idle
    IdleService.setIdleCallback(this.logoutFromIdle);

    if (TokenService.hasAuthToken()) {
      //tell the idle service to register event listeners
      //if the user doesn't trigger one of these event listeners,
      //the idleCallback (logout) will be invoked
      IdleService.registerIdleTimerResets();

      //Tell the token service to read the JWT, looking at the exp value
      //and queue a timeout just before the token expires
      TokenService.queueCallbackBeforeExpiry(() => {
        //the timeout will call this callback just before the token expires

        AuthApiService.postRefreshToken();
      });
    }
  }

  componentWillUnmount() {
    this.updateDataGoal();
    //stop the event listeners that auto logout (clear the token from storage)
    IdleService.unRegisterIdleResets();
    //and remove the refresh endpoint request
    TokenService.clearCallbackBeforeExpiry();
  }

  logoutFromIdle = () => {
    //remove the token from localStorage
    TokenService.clearAuthToken();
    //remove any queued calls to the refresh endpoint
    TokenService.clearCallbackBeforeExpiry();
    //remove the timeouts that auto logout when idle
    IdleService.unRegisterIdleResets();
    //tell React to re-render
    this.forceUpdate();
  };

  handleLoginFetch = async (history) => {
    //fetch the user's most recent goal
    const goal = await DaysApiService.getGoal();
    //if the logged-in user has not created a goal yet, push to setup page
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
      //fetch the days with fetched goal's id
      const days = await DaysApiService.getDays();

      this.setState(
        {
          days: days,
        },
        () => {
          history.push(`/daylist/${this.state.num_of_days}`);
        }
      );
    }
  };

  handleSubmit = (num_of_days, hours, history) => {
    //submit details for a new goal; postDays creates goal and days in one service
    DaysApiService.postDays(num_of_days, hours)
      .then((days) => {
        this.setState({
          days: days,
          num_of_days: num_of_days,
          hours_goal: parseFloat(hours),
          total_hours: 0,
          goal_id: days[0].goal_id,
        });
      })
      .then(() => history.push(`/daylist/${this.state.num_of_days}`));
  };

  handleDaySubmit = (updatedDay, history) => {
    if (updatedDay.completed === "false") {
      updatedDay.actual_hours = 0;
    }

    DaysApiService.updateDay(updatedDay).then(() => {
      DaysApiService.getDays()
        .then((days) => {
          this.setState({
            days: days,
          });
        })
        .then(() => {
          const hoursArray = this.state.days.map((day) => day.actual_hours);

          const hours = hoursArray.reduce((a, b) => a + b, 0);

          this.setState({
            total_hours: hours,
          });
        })
        .then(() => this.updateDataGoal())
        .then(() => {
          history.push("/daylist");
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

  handleLogout = () => {
    TokenService.clearAuthToken();
    // when logging out, clear the callbacks to the refresh api and idle auto logout
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.forceUpdate();
  };

  setError = (error) => {
    console.error(error);
    this.setState({ error });
  };

  setAppStateGoal = (goal) => {
    this.setState({
      user: goal.user_id,
      num_of_days: goal.num_of_days,
      total_hours: goal.total_hours,
      hours_goal: parseFloat(goal.hours_goal),
      goal_id: goal.id,
    });
  };

  setAppState = (days) => {
    this.setState({ days: days });
  };

  fetchData = () => {
    DaysApiService.getGoal()
      .then((goal) => {
        this.setAppStateGoal(goal);
      })
      .then(() => {
        DaysApiService.getDays().then((days) => {
          this.setAppState(days);
        });
      });
  };

  render() {
    const value = {
      days: this.state.days,
      num_of_days: this.state.num_of_days,
      total_hours: this.state.total_hours,
      hours_goal: this.state.hours_goal,
      goal_id: this.state.goal_id,
      error: this.state.error,
      fetchData: this.fetchData,
      setError: this.setError,
      onHandleSubmit: this.handleSubmit,
      onHandleDaySubmit: this.handleDaySubmit,
      onHandleLoginFetch: this.handleLoginFetch,
      updateDataGoal: this.updateDataGoal,
    };

    return (
      <Context.Provider value={value}>
        <div className="App">
          {!TokenService.hasAuthToken() && (
            <header className="App_header">
              <Link className="header_link" to="/">
                Practice Log
              </Link>
            </header>
          )}
          {TokenService.hasAuthToken() && (
            <header className="App_header">
              <Link className="header_link" to="/">
                Practice Log
              </Link>

              <Link to="/">
                <button className="toprowbtns" onClick={this.handleLogout}>
                  Logout
                </button>
              </Link>
            </header>
          )}
          <main className="App_main">
            <Switch>
              <Route exact path="/" component={Home} />

              <PrivateRoute path="/setup" component={Setup} />

              <PrivateRoute path="/day/:dayNum" component={DayForm} />

              <PrivateRoute path="/daylist" component={DayList} />

              <PublicOnlyRoute path="/register" component={RegistrationForm} />

              <Route component={NotFoundPage} />
            </Switch>
          </main>
        </div>
      </Context.Provider>
    );
  }
}

export default App;
