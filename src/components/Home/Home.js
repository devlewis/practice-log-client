import React, { PureComponent } from "react";
import "../Home/Home.css";
import { Button, Input } from "../Utils/Utils";

class Home extends PureComponent {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  handleLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || "/";
    history.push(destination);
  };

  render() {
    return (
      <div className="container_home">
        <h2>PRACTICE LOG HOME PAGE</h2>
        <div className="container_login">
          <LoginForm onLoginSuccess={this.handleLoginSuccess} />
        </div>
        <button onClickRegister={this.props.onClickRegister} />
      </div>
    );
  }
}

export default Home;
