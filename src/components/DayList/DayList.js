import React, { PureComponent } from "react";
import Day from "../Day/Day";
import "./DayList.css";
import FinalView from "../FinalView/FinalView";
import TokenService from "../../services/token-service";
import IdleService from "../../services/idle-service";
import { Link } from "react-router-dom";
import Context from "../../Context";

class DayList extends PureComponent {
  //state= { page: 0 }

  handleLogout = () => {
    TokenService.clearAuthToken();
    /* when logging out, clear the callbacks to the refresh api and idle auto logout */
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.props.history.push("/");
  };

  static contextType = Context;

  render() {
    const days = this.context.days.map((day) => (
      <Day key={day.id} {...day} hours_goal={this.context.hours_goal} />
    ));

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
