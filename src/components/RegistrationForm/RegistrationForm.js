import React, { Component } from "react";
import AuthApiService from "../../services/auth-api-service";

export default class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  };

  state = { error: null, user_name: "", password: "" };

  handleRegistrationSuccess = user => {
    const { history } = this.props;
    history.push("/");
  };

  handleSubmit = ev => {
    ev.preventDefault();
    const { user_name, password } = this.state;

    this.setState({ error: null });
    AuthApiService.postUser({
      user_name: user_name,
      password: password
    })
      .then(user => {
        this.setState({ user_name: "", password: "" });
        this.handleRegistrationSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <form className="RegistrationForm" onSubmit={this.handleSubmit}>
        <div role="alert">{error && <p className="red">{error}</p>}</div>
        <div className="user_name">
          <label htmlFor="RegistrationForm__user_name">User name</label>
          <input
            name="user_name"
            type="text"
            required
            id="RegistrationForm__user_name"
            onChange={e => this.setState({ user_name: e.target.value })}
          ></input>
        </div>
        <div className="password">
          <label htmlFor="RegistrationForm__password">Password</label>
          <input
            name="password"
            type="password"
            required
            id="RegistrationForm__password"
            onChange={e => this.setState({ password: e.target.value })}
          ></input>
        </div>
        <button type="submit">Register</button>
      </form>
    );
  }
}
