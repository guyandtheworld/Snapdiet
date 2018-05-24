import { createStore } from "redux";

const reducer = (state, action) => {
  if (action.type == "TEST") {
    return Object.assign({}, state, { name: action.payload.uid });
  } else if (action.type == "updateCalorie") {
    return Object.assign({}, state, {
      currentCalorie: action.payload.currentCalorie
    });
  } else if (action.type == "updateGoal") {
    return Object.assign({}, state, { dailyGoal: action.payload.dailyGoal });
  } else if (action.type == "updateNotif") {
    return Object.assign({}, state, { showNotif: action.payload.showNotif });
  } else if (action.type == "updateColor") {
    return Object.assign({}, state, {
      currentColor: action.payload.currentColor
    });
  } else if (action.type == "updateInfo") {
    return Object.assign({}, state, { userInfo: action.payload.userInfo });
  } else if (action.type == "updateHistoryConsumed") {
    return Object.assign({}, state, {
      actualCalories: action.payload.consumed
    });
  } else if (action.type == "updateHistoryGoals") {
    return Object.assign({}, state, { goalCalories: action.payload.goals });
  } else if (action.type == "updateHistoryDates") {
    return Object.assign({}, state, { dates: action.payload.dates });
  } else if (action.type == "UID") {
    return Object.assign({}, state, { uid: action.payload.uid });
  } else if (action.type == "USERNAME") {
    return Object.assign({}, state, { name: action.payload.name });
  } else if (action.type == "USERPIC") {
    return Object.assign({}, state, { pic: action.payload.pic });
  } else return state;
};

export default createStore(reducer, {
  name: "Snapdiet",
  dailyGoal: 0,
  currentCalorie: 0,
  showNotif: true,
  currentColor: "#78CC5B",
  userInfo: {
    age: "",
    height: "",
    weight: "",
    gender: "",
    lifestyle: ""
  },
  dates: ["0"],
  actualCalories: [0],
  goalCalories: [0],
  uid: "",
  pic: ""
});
