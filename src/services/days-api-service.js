import TokenService from "../services/token-service";
import config from "../config";

const DaysApiService = {
  // postGoal(user) {
  //   return fetch(`${config.API_ENDPOINT}prlog/goals`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${TokenService.getAuthToken()}`
  //     },
  //     body: JSON.stringify({
  //       user: user
  //     })
  //   });
  // },

  postDays(num_of_days, hours, user) {
    console.log(TokenService.getAuthToken());
    return fetch(`${config.API_ENDPOINT}prlog/goal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        num_of_days: num_of_days,
        actual_hours: hours,
        user: user
      })
    }).then(res => {
      console.log(res.json());
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json();
    });
  }
};

export default DaysApiService;
