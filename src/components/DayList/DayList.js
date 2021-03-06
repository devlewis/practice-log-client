import React, { PureComponent } from "react";
import Day from "../Day/Day";
import "./DayList.css";
import FinalView from "../FinalView/FinalView";
import TokenService from "../../services/token-service";
import IdleService from "../../services/idle-service";
import Context from "../../Context";

class DayList extends PureComponent {
  state = {
    page: 0,
    num_of_days: 0,
    see_all_days: true,
  };

  componentDidMount() {
    this.context.fetchData();
  }

  handleLogout = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.props.history.push("/");
  };

  paginate = () => {
    this.setState({ num_of_days: 7, see_all_days: false });
  };

  goBackDays = () => {
    if (this.state.page > 0) {
      this.setState({ page: this.state.page - 1 });
    }
  };

  seeNumOfDays = () => {
    if (this.context.num_of_days === 30 && this.state.page <= 3) {
      this.setState({ page: this.state.page + 1 });
    } else if (this.context.num_of_days === 100 && this.state.page <= 13)
      this.setState({ page: this.state.page + 1 });
    else {
      this.setState({ see_all_days: true });
    }
  };

  static contextType = Context;

  render() {
    if (this.context.days.length === 0) {
      return <div>Loading!</div>;
    }
    let days = [];
    if (this.state.see_all_days) {
      days = this.context.days.map((day) => (
        <Day key={day.id} {...day} hours_goal={this.context.hours_goal} />
      ));
    } else {
      days = this.context.days
        .slice(
          this.state.page * this.state.num_of_days,
          this.state.num_of_days * (this.state.page + 1)
        )
        .map((day) => (
          <Day key={day.id} {...day} hours_goal={this.context.hours_goal} />
        ));
    }

    return (
      <div>
        {this.context.days[this.context.days.length - 1].touched && (
          <FinalView
            totalDays={this.context.num_of_days}
            onClickSetup={({ history }) => history.push("/setup")}
          />
        )}
        <div className="banner">
          <h1 className="centered daylisth1">
            {this.context.num_of_days} Days of Practice
          </h1>
          <div className="toprow">
            <p className="tothours">Total Hours: {this.context.total_hours}</p>
          </div>
        </div>

        <div className="viewbox">
          {" "}
          {this.context.num_of_days > 7 && !this.state.see_all_days && (
            <div>
              <button
                onClick={() =>
                  this.setState({
                    see_all_days: true,
                  })
                }
              >
                Total View
              </button>
            </div>
          )}
          {this.state.see_all_days && this.context.num_of_days > 7 && (
            <button className="viewbtn" onClick={this.paginate}>
              Week View
            </button>
          )}
        </div>
        <div className="navigators">
          {!this.state.see_all_days && (
            <i
              onClick={this.goBackDays}
              className="fas fa-arrow-circle-left fa-2x"
            ></i>
          )}

          {this.context.num_of_days > 7 &&
            !this.state.see_all_days &&
            ((this.context.num_of_days === 100 && this.state.page <= 13) ||
              (this.context.num_of_days === 30 && this.state.page <= 3)) && (
              <i
                onClick={this.seeNumOfDays}
                className="fas fa-arrow-circle-right fa-2x"
              ></i>
            )}
        </div>
        <div className="container">{days}</div>
      </div>
    );
  }
}
export default DayList;
