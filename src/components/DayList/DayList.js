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
    console.log(this.state.page);
    console.log(this.context.num_of_days);

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
    // let days = [];
    // if (this.state.see_all_days) {
    //   console.log("see_all_days is true");
    let days = this.context.days.map((day) => (
      <Day key={day.id} {...day} hours_goal={this.context.hours_goal} />
    ));
    // } else {
    //   console.log("see_all_days is false");
    // days = this.context.days
    //   .slice(
    //     this.state.page * this.state.num_of_days,
    //     this.state.num_of_days * (this.state.page + 1)
    //   )
    //   .map((day) => (
    //     <Day key={day.id} {...day} hours_goal={this.context.hours_goal} />
    //   ));
    // }

    return (
      <div>
        {this.context.days[this.context.days.length - 1].touched && (
          <FinalView
            totalDays={this.context.num_of_days}
            onClickSetup={({ history }) => history.push("/setup")}
          />
        )}
        <div>
          Total Hours:
          {this.context.total_hours}
        </div>
        {/* <div className="viewbox">
          View:
          {this.context.num_of_days > 7 && !this.state.see_all_days && (
            <button
              onClick={() =>
                this.setState({
                  see_all_days: true,
                })
              }
            >
              See all days
            </button>
          )}
          {this.state.see_all_days && (
            <button onClick={this.paginate}>See 7 days at a time</button>
          )}
        </div>

        <div className="navigators">
          {this.state.page > 0 &&
            !this.state.see_all_days(
              <button onClick={this.goBackDays}>See last 7 days!</button>
            )}

          {this.context.num_of_days > 7 && !this.state.see_all_days && (
            <button className="seenext" onClick={this.seeNumOfDays}>
              See next 7 days!
            </button>
          )}
        </div> */}

        <div className="container">{days}</div>
        {TokenService.hasAuthToken() && (
          <Link to="/">
            <button onClick={this.handleLogout}>Logout</button>
          </Link>
        )}
      </div>
    );
  }
}
export default DayList;
