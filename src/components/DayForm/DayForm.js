import React, { Component } from "react";
import PropTypes from "prop-types";

const Required = () => <span className="BookmarkForm__required">*</span>;

class DayForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    day: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      date: PropTypes.string,
      completed: PropTypes.string,
      hours_goal: PropTypes.number,
      default_goal: PropTypes.number,
      technique: PropTypes.string,
      repertoire: PropTypes.string,
      goal_id: PropTypes.number
    })
  };

  static defaultProps = {
    day: {}
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleChangeCompleted();
    // this.context.handleChangeTechnique();
    // this.context.handleChangeRepertoire();
  };

  render() {
    const { error, onCancel } = this.props;
    const { id, date, completed, technique, repertoire } = this.props;
    return (
      <form className="DayForm__form" onSubmit={this.handleSubmit}>
        <div className="DayForm__error" role="alert">
          {error && <p>{error.message}</p>}
        </div>
        {id && <input type="hidden" name="id" value={id} />}
        <div>
          <h1>Practice Day #{this.props.id}</h1>

          <label htmlFor="completed">Did you practice today?</label>
          <select
            onChange={this.props.handleChangeCompleted}
            name="completed"
            id="completed"
            required
          >
            <option value="false">No. :-(</option>
            <option value="true">Yes!!!</option>
          </select>
        </div>
        <div>
          <label htmlFor="technique">Technique:</label>
          <input
            type="technique"
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
            type="repertoire"
            name="repertoire"
            id="repertoire"
            value={repertoire}
            onChange={this.handleChangeRepertoire}
          />
        </div>
        <div className="DayForm__buttons">
          <button type="button" onClick={onCancel}>
            Cancel
          </button>{" "}
          <button type="submit">Save</button>
        </div>
      </form>
    );
  }
}

export default DayForm;
