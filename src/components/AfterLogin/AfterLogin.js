import React, { PureComponent } from "react";
import "./AfterLogin.css";

class AfterLogin extends PureComponent {
  render() {
    return (
      <div>
        <button onClick={this.props.onClickCurrent}>
          Take me to my current goal!
        </button>
        <button onClick={this.props.onClickSetup}>Set up a new goal!</button>
      </div>
    );
  }
}

export default AfterLogin;
