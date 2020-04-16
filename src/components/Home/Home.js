import React, { Component } from "react";
import "../Home/Home.css";
import LoginForm from "../LoginForm/LoginForm";
import { withRouter } from "react-router";
import Context from "../../Context";

class Home extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  static contextType = Context;

  onClickRegister = () => {
    this.props.history.push("/register");
  };

  handleLoginSuccess = () => {
    this.context.onHandleLoginFetch(this.props.history);
  };

  render() {
    return (
      <div className="container_home">
        <h2>PRACTICE LOG HOME PAGE</h2>
        <div className="container_login">
          <LoginForm onLoginSuccess={this.handleLoginSuccess} />
        </div>
        <button className="rgstrbutton" onClick={this.onClickRegister}>
          Make a new account!
        </button>
        <p className="pinfo">
          This app is for logging hours and basic details for your daily
          practice. Users may choose goal lengths of 7, 30, or 100 consecutive
          days of practice, choose a daily number of hours goal, and log/edit
          their hours and practice notes accordingly. To try out the demo
          account, please sign in with the demo login provided above.
        </p>
      </div>
    );
  }
}

export default withRouter(Home);
