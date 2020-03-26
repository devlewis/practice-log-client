import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import "../Day/Day.css";

class Day extends PureComponent {
  render() {
    const dayId = this.props.id;
    const date = this.props.date;
    return (
      <div class="day_box">
        <p>Day #{dayId}</p>
        <p>{date}</p>
        <Link to={`/day/${dayId}`}>Did you practice today?</Link>
      </div>
    );
  }
}

export default Day;
