import React, { Component } from "react";

export default class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  };

  state = { error: null };

  handleSubmit = ev => {
    ev.preventDefault();
    const { user_name, password } = ev.target;

    console.log("registration form submitted");
    console.log({ user_name, password });

    user_name.value = "";
    password.value = "";
    this.props.onRegistrationSuccess();
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
          ></input>
        </div>
        <div className="password">
          <label htmlFor="RegistrationForm__password">Password</label>
          <input
            name="password"
            type="password"
            required
            id="RegistrationForm__password"
          ></input>
        </div>
        <button type="submit">Register</button>
      </form>
    );
  }
}
