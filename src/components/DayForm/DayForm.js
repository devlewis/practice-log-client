import React, { Component } from "react";
import PropTypes from "prop-types";
import "./DayForm.css";

class DayForm extends Component {
  static propTypes = {
    hours: PropTypes.number,
    handleDaySubmit: PropTypes.func,
    onClickCancel: PropTypes.func,
    goBack: PropTypes.func,
    dayId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    day: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      date: PropTypes.string,
      completed: PropTypes.string,
      technique: "",
      repertoire: "",
      actual_hours: PropTypes.number,
      goal_id: PropTypes.number,
      touched: PropTypes.bool
    })
  };

  static defaultProps = {
    day: {}
  };

  state = {
    id: parseFloat(this.props.id),
    date: this.props.day.date,
    goal_id: 1,
    actual_hours: this.props.day.actual_hours,
    completed: this.props.day.completed,
    technique: this.props.day.technique,
    repertoire: this.props.day.repertoire
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      id,
      date,
      completed,
      actual_hours,
      goal_id,
      technique,
      repertoire
    } = this.state;

    const updatedDay = {
      id,
      date,
      completed,
      actual_hours,
      goal_id,
      technique,
      repertoire,
      touched: true
    };

    this.props.handleDaySubmit(updatedDay);

    this.props.goBack();
  };

  handleChangeCompleted = e => {
    this.setState({
      completed: e.target.value
    });
  };

  handleChangeHours = e => {
    this.setState({ actual_hours: parseFloat(e.target.value) });
  };

  handleChangeTechnique = e => {
    this.setState({ technique: e.target.value });
  };

  handleChangeRepertoire = e => {
    this.setState({ repertoire: e.target.value });
  };

  render() {
    const { error } = this.props;
    const { id, actual_hours, technique, repertoire } = this.state;

    return (
      <form className="DayForm__form" onSubmit={this.handleSubmit}>
        <div className="DayForm__error" role="alert">
          {error && <p>{error.message}</p>}
        </div>
        {id && <input type="hidden" name="id" value={id} />}
        <div className="required_box">
          <h1>Practice Day #{this.props.id}</h1>
          <h2>{this.props.day.date}</h2>

          <label htmlFor="completed">Did you practice today?</label>
          <select
            onChange={this.handleChangeCompleted}
            name="completed"
            id="completed"
            required
          >
            <option value="false">No. :-(</option>
            <option value="true">Yes!!!</option>
          </select>
        </div>
        {this.state.completed === "true" && (
          <section>
            <p className="italics">Optional:</p>
            <div className="optional_box">
              <div>
                <label htmlFor="actual_hours">How Many Hours?</label>
                <input
                  type="number"
                  name="actual_hours"
                  id="actual_hours"
                  value={actual_hours}
                  onChange={this.handleChangeHours}
                />
              </div>

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
          <button type="button" onClick={this.props.onClickCancel}>
            Cancel
          </button>{" "}
          <button type="submit">Save</button>
        </div>
      </form>
    );
  }
}

export default DayForm;
