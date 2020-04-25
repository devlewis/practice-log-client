import React, { PureComponent } from "react";
import "../Setup/Setup.css";
import Context from "../../Context";
import TokenService from "../../services/token-service";
import IdleService from "../../services/idle-service";

class Setup extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      num_of_days: null,
      hours: null,
    };
  }

  static contextType = Context;

  handleSubmit = (e) => {
    e.preventDefault();
    this.context.onHandleSubmit(
      this.state.num_of_days,
      this.state.hours,
      this.props.history
    );
  };

  handleLogout = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="Setup_container">
        <h2>Setup</h2>
        <form className="Setup_form" onSubmit={this.handleSubmit}>
          <div className="Select_box">
            <label htmlFor="#ofDaysChoice"># of Practice Days</label>
            <select
              onChange={(e) =>
                this.setState({ num_of_days: parseFloat(e.target.value) })
              }
              name="#ofDaysChoice"
              id="#ofDaysChoice"
              required
            >
              <option value="">Select Length of Goal</option>
              <option value="7">7 Days</option>
              <option value="30">30 Days</option>
              <option value="100">100 Days</option>
            </select>
          </div>
          <div>
            <label htmlFor="hours"> Hours Per Day </label>
            <input
              onChange={(e) =>
                this.setState({
                  hours: parseFloat(e.target.value),
                })
              }
              type="text"
              name="hours"
              id="hours"
              placeholder="# of hrs"
              autoComplete="off"
              required
            />
          </div>
          <div className="Setup_buttons">
            <button type="submit">Start my goal today!</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Setup;
