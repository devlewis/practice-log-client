import React, { Component } from "react";
import TokenService from "../../services/token-service";
import AuthApiService from "../../services/auth-api-service";

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  };

  state = { error: null, user_name: "", password: "" };

  handleSubmitJwtAuth = ev => {
    ev.preventDefault();

    this.setState({ error: null });
    const { user_name, password } = this.state;

    AuthApiService.postLogin({
      user_name: user_name,
      password: password
    })
      .then(res => {
        this.setState({ user_name: "", password: "" });
        TokenService.saveAuthToken(res.authToken);
        this.props.onLoginSuccess();
      })
      .catch(res => {
        this.setState({
          error: res.error
        });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <form className="LoginForm" onSubmit={this.handleSubmitJwtAuth}>
        <div role="alert">{error && <p className="red">{error}</p>}</div>
        <div className="user_name">
          <label htmlFor="LoginForm__user_name">User name</label>
          <input
            required
            name="user_name"
            id="LoginForm__user_name"
            onChange={e => this.setState({ user_name: e.target.value })}
          ></input>
        </div>
        <div className="password">
          <label htmlFor="LoginForm__password">Password</label>
          <input
            required
            name="password"
            type="password"
            id="LoginForm__password"
            onChange={e => this.setState({ password: e.target.value })}
          ></input>
        </div>
        <button type="submit">Login</button>
      </form>
    );
  }
}
