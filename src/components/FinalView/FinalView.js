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

  daysCompleted = (days) => days.filter(d => d.completed === "true")

  daysCompletedHours = (days, h_goal) => days.filter(d => d.actual_hours >= h_goal)

  pushTechnique = (days, arr) => days.forEach((day) => {
    if (day.technique !== "" && !arr.includes(day.technique)) {
      arr.push(day.technique);
    }
  });

  pushRepertoire = (days, arr) => days.forEach((day) => {
    if (!arr.includes(day.repertoire) && day.repertoire !== "") {
      arr.push(day.repertoire);
    }
  });

  render() {
    const techniqueArr = [];
    const repertoireArr = [];

    this.pushTechnique(this.context.days, techniqueArr);
    this.pushRepertoire(this.context.days, repertoireArr);

    return (
      <main>
        <h1>YOU DID IT!</h1>
        <p className="finalview_p">
          You practiced {this.daysCompleted(this.context.days).length} out of {this.props.totalDays}{" "}
          goal days!
        </p>
        <p className="finalview_p">
          You reached your practice hourly goal {this.daysCompletedHours(this.context.days, this.context.hours_goal).length} out
          of {this.props.totalDays} days.
        </p>
        <p className="finalview_p">
          {" "}
          You practiced a total of {this.context.total_hours} hours during your{" "}
          {this.props.totalDays}-day goal.
        </p>
        <p className="finalview_p">Technique items recorded:</p>
        <ul className="technique_list">
          {techniqueArr.map((item, i) => {
            return <li key={i}>{item}</li>;
          })}
        </ul>
        <p className="finalview_p">Repertoire items recorded:</p>
        <ul className="repertoire_list">
          {repertoireArr.map((item, i) => (
            <li key={i}>{item}</li>
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
