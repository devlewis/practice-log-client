import React, { Component } from "react";
//import PropTypes from "prop-types";
import "./DayForm.css";
import Context from "../../Context";
import ValidationError from "../Utils/ValidationError";

class DayForm extends Component {
  static propTypes = {};

  static contextType = Context;

  state = {
    error: null,
    id: "",
    day_num: "",
    day_date: "",
    completed: "",
    technique: "",
    repertoire: "",
    actual_hours: { value: "", touched: false },
    touched: "",
    goal_id: "",
    user_id: "",
    goal_hours: "",
  };

  componentDidMount() {
    const dayNum = this.props.location.pathname.split("/")[2];
    const day = this.context.days[dayNum - 1];

    this.setState({
      id: day.id,
      day_num: day.day_num,
      day_date: day.date,
      completed: day.completed,
      technique: day.technique,
      repertoire: day.repertoire,
      actual_hours: { value: day.actual_hours },
      touched: day.touched,
      goal_id: day.goal_id,
      user_id: day.user_id,
      goal_hours: day.goal_hours,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      id,
      day_num,
      day_date,
      completed,
      technique,
      repertoire,
      actual_hours,
      goal_id,
      user_id,
      goal_hours,
    } = this.state;

    const updatedDay = {
      id,
      day_num,
      day_date,
      completed,
      technique,
      repertoire,
      actual_hours: parseFloat(actual_hours.value.toFixed(2)),
      touched: true,
      goal_id,
      user_id,
      goal_hours,
    };

    const dayId = id;

    this.context.onHandleDaySubmit(updatedDay, dayId);

    this.props.history.goBack();
  };

  validateHours() {
    const hours = this.state.actual_hours.value;
    if (isNaN(hours) || hours < 0 || hours > 24) {
      return "please enter a number of hours between 0 and 24";
    }
  }

  handleChangeCompleted = (e) => {
    this.setState({
      completed: e.target.value,
      actual_hours: { value: this.state.goal_hours },
    });
  };

  handleChangeHours = (e) => {
    this.setState({
      actual_hours: { value: parseFloat(e.target.value), touched: true },
    });
  };

  handleChangeTechnique = (e) => {
    this.setState({ technique: e.target.value });
  };

  handleChangeRepertoire = (e) => {
    this.setState({ repertoire: e.target.value });
  };

  render() {
    const hoursError = this.validateHours();
    const dayNum = this.props.location.pathname.split("/")[2];
    const { error } = this.state;
    const { id, completed, technique, repertoire, actual_hours } = this.state;

    return (
      <form className="DayForm__form" onSubmit={this.handleSubmit}>
        <div className="DayForm__error" role="alert">
          {error && <p>{error.message}</p>}
        </div>
        {id && <input type="hidden" name="id" value={id} />}
        <div className="required_box">
          <h1>Practice Day #{dayNum}</h1>
          <h2>{this.state.day_date}</h2>
          <h3>Goal Number of Hours:{this.state.goal_hours}</h3>
          <div className="error" role="alert">
            {error && <p>{error.message}</p>}
          </div>
          <label htmlFor="completed">Did you practice today?</label>
          <select
            onChange={this.handleChangeCompleted}
            name="completed"
            id="completed"
            required
            value={completed}
          >
            <option value="false">No. :-(</option>
            <option value="true">Yes!!!</option>
          </select>
        </div>
        {this.state.completed === "true" && (
          <section>
            <div>
              <label htmlFor="actual_hours">How Many Hours?</label>
              <input
                type="number"
                name="actual_hours"
                id="actual_hours"
                value={actual_hours.value}
                onChange={this.handleChangeHours}
              />
              {this.state.actual_hours.touched && (
                <ValidationError message={hoursError} />
              )}
            </div>
            <div className="optional_box">
              <p className="italics">Optional:</p>

              <div>
                <label htmlFor="technique">Technique:</label>
                <input
                  type="text"
                  name="technique"
                  id="technique"
                  placeholder="ex. Hanon No. 1"
                  value={technique}
                  onChange={this.handleChangeTechnique}
                />
              </div>
              <div>
                <label htmlFor="repertoire">Repertoire:</label>
                <input
                  type="text"
                  name="repertoire"
                  id="repertoire"
                  value={repertoire}
                  onChange={this.handleChangeRepertoire}
                />
              </div>
            </div>
          </section>
        )}
        <div className="DayForm__buttons">
          <button type="button" onClick={(e) => this.props.history.goBack()}>
            Cancel
          </button>{" "}
          <button type="submit">Save</button>
        </div>
      </form>
    );
  }
}

export default DayForm;
