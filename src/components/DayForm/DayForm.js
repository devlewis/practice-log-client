import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./DayForm.css";
import Context from "../../Context";
import ValidationError from "../Utils/ValidationError";

class DayForm extends Component {
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
    const dayNum = this.props.location.pathname.split("/")[2] - 1;
    if (this.context.days.length > 0) {
      this.setState({
        id: this.context.days[dayNum].id,
        day_num: this.context.days[dayNum].day_num,
        day_date: this.context.days[dayNum].day_date,
        completed: this.context.days[dayNum].completed,
        technique: this.context.days[dayNum].technique,
        repertoire: this.context.days[dayNum].repertoire,
        actual_hours: { value: this.context.days[dayNum].actual_hours },
        touched: this.context.days[dayNum].touched,
        goal_id: this.context.days[dayNum].goal_id,
        user_id: this.context.days[dayNum].user_id,
        goal_hours: this.context.days[dayNum].goal_hours,
      });
    }
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
      day_date: new Date(day_date + "2020").toISOString(),
      completed,
      technique,
      repertoire,
      actual_hours: parseFloat(actual_hours.value.toFixed(2)),
      touched: true,
      goal_id,
      user_id,
      goal_hours,
    };

    this.context.onHandleDaySubmit(updatedDay, this.props.history);
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
    if (this.context.days.length === 0) {
      return <Redirect to="/daylist/" />;
    } else {
      const { error } = this.state;
      const hoursError = this.validateHours();
      const { id, completed, technique, repertoire, actual_hours } = this.state;
      return (
        <form className="DayForm__form" onSubmit={this.handleSubmit}>
          <div className="DayForm__error" role="alert">
            {error && <p>{error.message}</p>}
          </div>
          {id && <input type="hidden" name="id" value={id} />}
          <div className="required_box">
            <h1>Practice Day #{this.state.day_num}</h1>
            <h2>{this.state.day_date}</h2>
            <h3>Goal Number of Hours: {this.state.goal_hours}</h3>
            <div className="error" role="alert">
              {error && <p>{error.message}</p>}
            </div>{" "}
            <div className="selects">
              <label htmlFor="completed">Did you practice today?</label>
              <select
                onChange={this.handleChangeCompleted}
                name="completed"
                id="completed"
                required
                value={completed}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>
          {this.state.completed === "true" && (
            <section>
              <div>
                <label htmlFor="actual_hours">How many hours?</label>
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
                    type="textarea"
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
                    type="textarea"
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
            <button disabled={hoursError !== undefined} type="submit">
              Save
            </button>
          </div>
        </form>
      );
    }
  }
}

export default DayForm;
