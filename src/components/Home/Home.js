import React, { Component } from "react";
import "../Home/Home.css";
import LoginForm from "../LoginForm/LoginForm";
import { withRouter } from "react-router";

class Home extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  handleLoginSuccess = () => {
    console.log("called?");
    const { history } = this.props;
    history.push("/afterlogin");
  };

  render() {
    return (
      <div className="container_home">
        <h2>PRACTICE LOG HOME PAGE</h2>
        <div className="container_login">
          <LoginForm onLoginSuccess={this.handleLoginSuccess} />
        </div>
        <button onClick={this.props.onClickRegister}>
          Make a new account!
        </button>
      </div>
    );
  }
}

export default withRouter(Home);
