import React, { PureComponent } from "react";
import "./FinalView.css";
import { Link } from "react-router-dom";
import Context from "../../Context";

class FinalView extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static contextType = Context;

  render() {
    console.log(this.context.days[0].actual_hours);
    console.log(this.context.hours_goal);

    const daysCompleted = this.context.days.filter(
      (day) => day.completed === "true"
    );
    const daysCompletedHours = this.context.days.filter(
      (day) => day.actual_hours >= this.props.hours_goal
    );

    console.log(daysCompletedHours);

    const techniqueArr = [];
    const repertoireArr = [];

    this.context.days.forEach((day) => {
      if (day.technique !== "" && !techniqueArr.includes(day.technique)) {
        techniqueArr.push(day.technique);
      }
    });

    this.context.days.forEach((day) => {
      if (!repertoireArr.includes(day.repertoire) && day.repertoire !== "") {
        repertoireArr.push(day.repertoire);
      }
    });

    return (
      <main>
        <h1>YOU DID IT!</h1>
        <p className="finalview_p">
          You practiced {daysCompleted.length} out of {this.context.totalDays}{" "}
          goal days!
        </p>
        <p className="finalview_p">
          You reached your practice hourly goal {daysCompletedHours.length} out
          of {this.context.totalDays} days.
        </p>
        <p className="finalview_p">
          {" "}
          You practiced a total of {this.context.total_hours} hours during your{" "}
          {this.context.totalDays}-day goal.
        </p>
        <p className="finalview_p">Technique items recorded:</p>
        <ul className="technique_list">
          {techniqueArr.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
        <p className="finalview_p">Repertoire items recorded:</p>
        <ul className="repertoire_list">
          {repertoireArr.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
        <Link to="/setup">
          <button>Set up a new goal!</button>
        </Link>
      </main>
    );
  }
}

export default FinalView;
