import React, { PureComponent } from "react";
import Day from "../Day/Day";
import "./DayList.css";

class DayList extends PureComponent {
  render() {
    const days = this.props.days.map(day => <Day key={day.id} {...day} />);
    console.log(days);
    return (
      <div>
        <div className="container">{days}</div>
        <div>
          Total Hours:
          {/* {this.context.hoursActualTotal} */}
        </div>
        <div>
          Total Goal Hours:
          {/* {this.context.hoursGoalsTotal} */}
        </div>
      </div>
    );
  }
}
export default DayList;
