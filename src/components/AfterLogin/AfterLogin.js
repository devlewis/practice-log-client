import React, { PureComponent } from "react";
import "./AfterLogin.css";
import Context from "../../Context";

class AfterLogin extends PureComponent {
  static contextType = Context;

  handleLoginFetch = (e) => {
    this.context.onHandleLoginFetch(this.props.history);
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <button onClick={this.handleLoginFetch}>
          Take me to my current goal!
        </button>
        <button onClick={() => this.props.history.push("/setup")}>
          Set up a new goal!
        </button>
      </div>
    );
  }
}

export default AfterLogin;
