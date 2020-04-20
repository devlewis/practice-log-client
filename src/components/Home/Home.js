import React, { Component } from "react";
import "../Home/Home.css";
import LoginForm from "../LoginForm/LoginForm";
import { withRouter } from "react-router";
import Context from "../../Context";
import TokenService from "../../services/token-service";
import IdleService from "../../services/idle-service";
import manhassat_stand_small from "../../images/manhassat_stand_small.png";

class Home extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  static contextType = Context;

  onClickCurrent = () => {
    this.props.history.push("/daylist");
  };

  onClickRegister = () => {
    this.props.history.push("/register");
  };

  handleLoginSuccess = () => {
    this.context.onHandleLoginFetch(this.props.history);
  };

  handleLogout = () => {
    TokenService.clearAuthToken();
    /* when logging out, clear the callbacks to the refresh api and idle auto logout */
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <div className="container_page">
          <div className="container_main">
            <div className="container_tophalf">
              <div className="container_heading">
                <h2>Practice.</h2>
                <img
                  className="stand"
                  src={manhassat_stand_small}
                  alt="music stand"
                />
              </div>
              <div className="day_box_row">
                <div className="day_box_DECO">
                  <div className="bold">
                    <div className="topline">
                      <p>Day #1</p>
                    </div>
                    <p>April 2, 2020</p>
                  </div>
                </div>
                <div className="day_box_DECO">
                  <div className="bold">
                    <div className="topline">
                      <p>Day #2</p>
                    </div>
                    <p>April 3, 2020</p>
                  </div>
                </div>
                <div className="day_box_DECO">
                  <div className="bold">
                    <div className="topline">
                      <p>Day #3</p>
                    </div>
                    <p>April 4, 2020</p>
                  </div>
                </div>
                <div className="day_box_DECO">
                  <div className="bold">
                    <div className="topline">
                      <p>YOU DID IT!</p>
                    </div>
                    <p>You practiced 2/3 goal days.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="container_home">
              {TokenService.hasAuthToken() ? (
                <div className="container_loggedin">
                  <button onClick={this.onClickCurrent}>
                    Take me to my current practice goal!
                  </button>
                  <button onClick={(e) => this.props.history.push("/setup")}>
                    Start over with a new goal!
                  </button>
                  <button className="rgstrbutton" onClick={this.handleLogout}>
                    Logout
                  </button>
                </div>
              ) : (
                <div className="notloggedin">
                  <div className="loginform_box">
                    <LoginForm onLoginSuccess={this.handleLoginSuccess} />
                  </div>
                </div>
              )}
            </div>
          </div>
          <button className="rgstrbutton" onClick={this.onClickRegister}>
            Make a new account!
          </button>
          <section className="pinfo">
            <p>
              This app is for logging hours and basic details for your daily
              practice. Users may choose goal lengths of 7, 30, or 100
              consecutive days of practice, choose a daily number of hours goal,
              and log/edit their hours and practice notes accordingly.
            </p>
            <p>
              To try out the demo account, please sign in with the demo login
              provided above.
            </p>
          </section>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
