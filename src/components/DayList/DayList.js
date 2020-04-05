import React, { PureComponent } from "react";
import Day from "../Day/Day";
import "./DayList.css";
import FinalView from "../FinalView/FinalView";
import TokenService from "../../services/token-service";
import { Link } from "react-router-dom";
import Context from "../../Context";

class DayList extends PureComponent {
  //state= { page: 0 }

  static contextType = Context;

  handleLogoutClick = () => {
    TokenService.clearAuthToken();
  };

  render() {
    const days = this.context.days.map((day) => (
      <Day key={day.id} {...day} goal_hours={this.context.hours_goal} />
    ));

    return (
      <div>
        <div>
          Total Hours:
          {this.context.total_hours}
        </div>
        <div className="container">{days}</div>
        {this.context.days[this.context.days.length - 1].completed === true && (
          <FinalView
            totalDays={this.props.num_of_days}
            onClickSetup={({ history }) => history.push("/setup")}
          />
        )}
        {TokenService.hasAuthToken() && (
          <Link to="/">
            <button onClick={this.handleLogoutClick}>Logout</button>
          </Link>
        )}
      </div>
    );
  }
}
export default DayList;
