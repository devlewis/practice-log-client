import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import "../Day/Day.css";

class Day extends PureComponent {
  render() {
    let mystyle = {};
    this.props.touched && this.props.completed === "false"
      ? (mystyle = {
          color: "white",
          backgroundColor: "red",
        })
      : this.props.touched &&
        this.props.completed === "true" &&
        this.props.actual_hours < this.props.goal_hours
      ? (mystyle = {
          color: "black",
          backgroundColor: "yellow",
        })
      : this.props.touched && this.props.completed === "true"
      ? (mystyle = {
          color: "white",
          backgroundColor: "green",
        })
      : (mystyle = {});

    const day_num = this.props.day_num;
    const date = this.props.date;

    return (
      <div className="day_box" style={mystyle}>
        <p>Day #{day_num}</p>
        <p>{date}</p>
        {this.props.touched === false ? (
          <Link to={`/day/${day_num}`}>Did you practice today?</Link>
        ) : (
          <section className="completed_box">
            <p>Hours Practiced: {this.props.actual_hours}</p>
            <p>Goal Hours: {this.props.hours_goal}</p>
            {/* {this.props.technique || this.props.repertoire && (
            <p>Practice Details:<br>
            Technique: {this.props.technique}<br>
            Repertoire: {this.props.repertoire}</p>)} */}
            <Link to={`/day/${day_num}`}>Edit Practice Details</Link>
          </section>
        )}
      </div>
    );
  }
}

export default Day;
