import React, { Component } from "react";
import AuthApiService from "../../services/auth-api-service";
import "./LoginForm.css";

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => { },
  };

  state = { error: null, user_name: "", password: "" };

  handleSubmitJwtAuth = (e) => {
    e.preventDefault();

    this.setState({ error: null });
    const { user_name, password } = this.state;

    AuthApiService.postLogin({
      user_name: user_name,
      password: password,
    })
      .then((res) => {
        this.setState({ user_name: "", password: "" });

        this.props.onLoginSuccess();
      })
      .catch((res) => {
        let error = "Could not reach server; please try again later!";
        if (res.error) {
          error = res.error;
        }
        this.setState({
          error: error,
        });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <div className="loginform_box">
        <form className="LoginForm" onSubmit={this.handleSubmitJwtAuth}>
          <div className="user_name">
            <label htmlFor="LoginForm__user_name">User name</label>
            <input
              required
              name="user_name"
              id="LoginForm__user_name"
              onChange={(e) => this.setState({ user_name: e.target.value })}
            ></input>
            <p>demo username: YoYoMa77!</p>
          </div>
          <div className="password">
            <label htmlFor="LoginForm__password">Password</label>
            <input
              required
              name="password"
              type="password"
              id="LoginForm__password"
              onChange={(e) => this.setState({ password: e.target.value })}
            ></input>
            <p>demo password: Cello123!</p>
          </div>
          <button type="submit">Login</button>
        </form>
        <div role="alert">{error && <p className="red">{error}</p>}</div>
      </div>
    );
  }
}
