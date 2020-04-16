function make100Days() {
  let days100 = new Array(100);
  for (let i = 0; i < 100; i++) {
    days100[i] = {
      id: i + 1,
      day_num: i + 1,
      date: "March 22",
      completed: "false",
      technique: "",
      repertoire: "",
      actual_hours: null,
      goal_id: 1,
      touched: false
    };
  }
  return days100;
}

const days100 = make100Days();

export default days100;
