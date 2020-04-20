import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import "../Day/Day.css";

class Day extends PureComponent {
  state = {
    hover: false,
  };

  getInitialState = () => {
    return { hover: false };
  };

  toggleHover = () => {
    this.setState({ hover: !this.state.hover });
  };

  render() {
    let mystyle = {};

    this.state.hover
      ? (mystyle = {
          color: "black",
          backgroundColor: "aliceblue",
        })
      : this.props.touched && this.props.completed === "false"
      ? (mystyle = {
          color: "white",
          backgroundColor: "red",
        })
      : this.props.touched &&
        this.props.completed === "true" &&
        this.props.actual_hours < this.props.hours_goal
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
    const date = this.props.day_date;

    return (
      <Link to={`/day/${day_num}`}>
        <div
          className="day_box"
          style={mystyle}
          onMouseEnter={this.toggleHover}
          onMouseLeave={this.toggleHover}
        >
          <div className="bold">
            <div className="topline">
              <p className="big">Day #{day_num}</p>
              <i className="fas fa-pencil-alt fa-sm"></i>
            </div>
            <p className="big">{date}</p>
          </div>
          {this.props.touched === false ? (
            <div className="qubox">
              <i class="fas fa-question fa-3x"></i>
            </div>
          ) : (
            <section className="completed_box">
              <p>
                Hours Practiced: {this.props.actual_hours}/
                {this.props.goal_hours}
              </p>
              {(this.props.technique || this.props.repertoire) && (
                <p className="bold">Practice Details:</p>
              )}
              {this.props.technique && <p>Technique: {this.props.technique}</p>}
              {this.props.repertoire && (
                <p> Repertoire: {this.props.repertoire}</p>
              )}
            </section>
          )}
        </div>
      </Link>
    );
  }
}

export default Day;
