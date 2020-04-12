import React, { Component } from "react";
import PropTypes from "prop-types";
import "./DayForm.css";
import Context from "../../Context";

class DayForm extends Component {
  static propTypes = {
    hours: PropTypes.number,
    handleDaySubmit: PropTypes.func,
    onClickCancel: PropTypes.func,
    goBack: PropTypes.func,
    dayId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    day: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      day_num: PropTypes.number,
      date: PropTypes.string,
      completed: PropTypes.string,
      technique: "",
      repertoire: "",
      actual_hours: PropTypes.number,
      goal_id: PropTypes.number,
      touched: PropTypes.bool,
    }),
  };

  static defaultProps = {
    day: {},
  };

  static contextType = Context;

  state = {
    id: "",
    day_num: "",
    day_date: "",
    completed: "",
    technique: "",
    repertoire: "",
    actual_hours: "",
    touched: "",
    goal_id: "",
    user_id: "",
    goal_hours: "",
  };

  componentDidMount() {
    const dayNum = this.props.location.pathname.split("/")[2];
    console.log(dayNum);
    const day = this.context.days[dayNum - 1];
    this.setState({
      id: day.id,
      day_num: day.day_num,
      day_date: day.date,
      completed: day.completed,
      technique: day.technique,
      repertoire: day.repertoire,
      actual_hours: day.actual_hours,
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
      actual_hours,
      touched: true,
      goal_id,
      user_id,
      goal_hours,
    };

    const dayId = id;

    this.context.onHandleDaySubmit(updatedDay, dayId);

    this.context.updateDataGoal();

    this.props.history.goBack();
  };

  handleChangeCompleted = (e) => {
    this.setState({
      completed: e.target.value,
    });
  };

  handleChangeHours = (e) => {
    this.setState({ actual_hours: parseFloat(e.target.value) });
  };

  handleChangeTechnique = (e) => {
    this.setState({ technique: e.target.value });
  };

  handleChangeRepertoire = (e) => {
    this.setState({ repertoire: e.target.value });
  };

  render() {
    const dayNum = this.props.location.pathname.split("/")[2];

    const { error } = this.props;
    const { id, technique, repertoire, actual_hours } = this.state;

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
          <button type="button" onClick={this.props.history.goBack()}>
            Cancel
          </button>{" "}
          <button type="submit">Save</button>
        </div>
      </form>
    );
  }
}

export default DayForm;
