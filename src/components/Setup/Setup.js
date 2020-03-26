import React, { PureComponent } from "react";
import "../Setup/Setup.css";

class Setup extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hours: { value: "", touched: true },
      num_of_days: 7
    };
  }

  render() {
    return (
      <div>
        <form className="Setup_form" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="#ofDaysChoice">
              How Many Consecutive Days Will You Practice?
            </label>
            <select
              onChange={e => this.setState({ num_of_days: e.target.value })}
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
            <label htmlFor="hours"> How Many Hours Per Day? </label>
            <input
              onChange={e =>
                this.setState({
                  hours: {
                    value: e.target.value,
                    touched: true
                  }
                })
              }
              type="text"
              name="hours"
              id="hours"
              placeholder="# of hrs (ex. 2.5)"
              autocomplete="off"
              required
            />
          </div>
          <div className="Setup_buttons">
            <button type="button" onClick={this.props.onClickCancel}>
              Cancel
            </button>
            {""}
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Setup;
