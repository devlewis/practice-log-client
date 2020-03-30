import React, { PureComponent } from "react";
import Day from "../Day/Day";
import "./DayList.css";
import FinalView from "../FinalView/FinalView";

class DayList extends PureComponent {
  //state= { page: 0 }
  render() {
    console.log(this.props.days);
    const days = this.props.days.map(day => (
      <Day key={day.id} {...day} goal_hours={this.props.goal_hours} />
    ));
    return (
      <div>
        <div>
          Total Hours:
          {this.props.total_hours}
        </div>
        <div className="container">{days}</div>
        {this.props.days.filter(day => day.touched).length ===
          this.props.days.length && (
          <FinalView
            totalDays={this.props.num_of_days}
            total_hours={this.props.total_hours}
            days={this.props.days}
            hours_goal={this.props.hours_goal}
            onClickSetup={({ history }) => history.push("/setup")}
          />
        )}
      </div>
    );
  }
}
export default DayList;
