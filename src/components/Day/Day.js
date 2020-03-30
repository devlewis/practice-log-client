import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import "../Day/Day.css";

class Day extends PureComponent {
  render() {
    let mystyle = {};
    this.props.touched && this.props.completed === "false"
      ? (mystyle = {
          color: "white",
          backgroundColor: "red"
        })
      : this.props.touched &&
        this.props.completed === "true" &&
        this.props.actual_hours < this.props.goal_hours
      ? (mystyle = {
          color: "black",
          backgroundColor: "yellow"
        })
      : this.props.touched && this.props.completed === "true"
      ? (mystyle = {
          color: "white",
          backgroundColor: "green"
        })
      : (mystyle = {});

    const dayId = this.props.id;
    const date = this.props.date;

    return (
      <div className="day_box" style={mystyle}>
        <p>Day #{dayId}</p>
        <p>{date}</p>
        {this.props.touched === false ? (
          <Link to={`/day/${dayId}`}>Did you practice today?</Link>
        ) : (
          <Link to={`/day/${dayId}`}>Edit Practice Details</Link>
        )}
      </div>
    );
  }
}

export default Day;
