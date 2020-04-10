import TokenService from "../services/token-service";
import config from "../config";

const DaysApiService = {
  postDays(num_of_days, hours) {
    return fetch(`${config.API_ENDPOINT}prlog/goal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        num_of_days: num_of_days,
        actual_hours: hours,
        total_hours: 0,
      }),
    }).then((res) => res.json());
  },

  getDays() {
    return fetch(`${config.API_ENDPOINT}prlog/alldays`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) => res.json());
  },

  getGoal() {
    return fetch(`${config.API_ENDPOINT}prlog/goal`, {
      method: "GET",
      headers: {
        "Content-Type": "application.json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) => res.json());
  },

  updateDay(dayId, dayToUpdate) {
    console.log("dayId in service", dayId);
    console.log("updatedDay in service", dayToUpdate);
    return fetch(`${config.API_ENDPOINT}prlog/days/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        dayId: dayId,
        dayToUpdate: dayToUpdate,
      }),
    }).then((res) => {
      console.log(res);
    });
  },

  updateGoal(updatedGoal, goalId) {
    return fetch(`${config.API_ENDPOINT}prlog/updategoal/`, {
      method: "POST",
      headers: {
        "Content-Type": "application.json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        num_of_days: updatedGoal.num_of_days,
        total_hours: updatedGoal.total_hours,
        hours_goal: updatedGoal.hours_goal,
        goal_id: goalId,
      }),
    }).then((res) => res.status(204).end());
  },
};

export default DaysApiService;
