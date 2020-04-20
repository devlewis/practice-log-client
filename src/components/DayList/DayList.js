import React, { PureComponent } from "react";
import Day from "../Day/Day";
import "./DayList.css";
import FinalView from "../FinalView/FinalView";
import TokenService from "../../services/token-service";
import IdleService from "../../services/idle-service";
import { Link } from "react-router-dom";
import Context from "../../Context";

class DayList extends PureComponent {
  state = {
    page: 0,
    num_of_days: 0,
    see_all_days: true,
  };

  handleLogout = () => {
    TokenService.clearAuthToken();
    /* when logging out, clear the callbacks to the refresh api and idle auto logout */
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.props.history.push("/");
  };

  paginate = () => {
    this.setState({ num_of_days: 7, see_all_days: false });
  };

  goBackDays = () => {
    if (this.state.page > 0) {
      this.setState({ page: this.state.page - 1 });
    }
  };

  seeNumOfDays = () => {
    if (this.context.num_of_days == 30 && this.state.page <= 3) {
      this.setState({ page: this.state.page + 1 });
    } else if (this.context.num_of_days == 100 && this.state.page <= 12)
      this.setState({ page: this.state.page + 1 });
    else {
      this.setState({ see_all_days: true });
    }
  };

  static contextType = Context;

  render() {
    let days = [];
    if (this.state.see_all_days) {
      console.log("see_all_days is true");
      days = this.context.days.map((day) => (
        <Day key={day.id} {...day} hours_goal={this.context.hours_goal} />
      ));
    } else {
      console.log("see_all_days is false");
      days = this.context.days
        .slice(
          this.state.page * this.state.num_of_days,
          this.state.num_of_days * (this.state.page + 1)
        )
        .map((day) => (
          <Day key={day.id} {...day} hours_goal={this.context.hours_goal} />
        ));
    }

    return (
      <div>
        {this.context.days[this.context.days.length - 1].touched && (
          <FinalView
            totalDays={this.context.num_of_days}
            onClickSetup={({ history }) => history.push("/setup")}
          />
        )}
        <div className="banner">
          <h1 className="centered">
            #{this.context.num_of_days} Days of Practice
          </h1>
          <div className="toprow">
            <p>Total Hours: {this.context.total_hours}</p>
            <button onClick={(e) => this.props.history.push("/setup")}>
              Start over with a new goal!
            </button>
            {TokenService.hasAuthToken() && (
              <Link to="/">
                <button className="day_logout_btn" onClick={this.handleLogout}>
                  Logout
                </button>
              </Link>
            )}
          </div>
        </div>

        <div className="viewbox">
          {" "}
          {this.context.num_of_days > 7 && !this.state.see_all_days && (
            <div>
              <button
                onClick={() =>
                  this.setState({
                    see_all_days: true,
                  })
                }
              >
                See all days
              </button>
            </div>
          )}
          {this.state.see_all_days && this.context.num_of_days > 7 && (
            <button className="viewbtn" onClick={this.paginate}>
              See 7 days at a time
            </button>
          )}
        </div>
        <div className="navigators">
          {!this.state.see_all_days && (
            <i
              onClick={this.goBackDays}
              class="fas fa-arrow-circle-left fa-2x"
            ></i>
          )}

          {this.context.num_of_days > 7 &&
            !this.state.see_all_days &&
            ((this.context.num_of_days == 100 && this.state.page <= 12) ||
              (this.context.num_of_days == 30 && this.state.page <= 3)) && (
              <i
                onClick={this.seeNumOfDays}
                class="fas fa-arrow-circle-right fa-2x"
              ></i>
            )}
        </div>

        <div className="container">{days}</div>
      </div>
    );
  }
}
export default DayList;
