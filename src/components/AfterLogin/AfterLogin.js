import React, { PureComponent } from "react";
import "./AfterLogin.css";
import Context from "../../Context";
import TokenService from "../../services/token-service";
import IdleService from "../../services/idle-service";

class AfterLogin extends PureComponent {
  static contextType = Context;

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
        <button onClick={() => this.props.history.push("/daylist")}>
          Take me to my current goal!
        </button>

        <button onClick={() => this.props.history.push("/setup")}>
          Set up a new goal!
        </button>
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }
}

export default AfterLogin;
