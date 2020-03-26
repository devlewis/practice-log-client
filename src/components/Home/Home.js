import React, { PureComponent } from "react";
import "../Home/Home.css";
import { Redirect } from "react-router-dom";

class Home extends PureComponent {
  state = { user: "", password: "" };
  render() {
    return (
      <div className="container_home">
        <h2>PRACTICE LOG HOME PAGE</h2>
        <div className="container_login">
          <form className="AddNote_form" onSubmit={this.handleSubmit}>
            <div className="AddNote_error" role="alert">
              {/* {error && <p>{error.message}</p>} */}
            </div>
            <div className="form">
              <label htmlFor="user">User Name</label>
              <input
                onChange={e =>
                  this.setState({
                    user: {
                      value: e.target.value,
                      touched: true
                    }
                  })
                }
                type="text"
                name="user"
                id="user"
                autocomplete="off"
                required
              />
              <label htmlFor="password">Password</label>
              <input
                onChange={e =>
                  this.setState({
                    password: {
                      value: e.target.value,
                      touched: true
                    }
                  })
                }
                type="text"
                name="password"
                id="password"
                autocomplete="off"
                required
              />
              <button onClick={this.props.onClickSignIn}>Sign In</button>
            </div>
          </form>
          <button className="login_new">Set up a new account!</button>
        </div>
      </div>
    );
  }
}

export default Home;
