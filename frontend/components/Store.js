import {createStore} from 'redux';

const reducer = (state, action) => {
  if (action.type == 'TEST') {
    return Object.assign({}, state, {name: 'SUCCESS'})
  } else if (action.type == 'updateCalorie') {
    return Object.assign({}, state, {currentCalorie: action.payload.currentCalorie})
  } else if (action.type == 'updateGoal') {
    return Object.assign({}, state, {dailyGoal: action.payload.dailyGoal})
  } else if (action.type == 'updateNotif') {
    return Object.assign({}, state, {showNotif: action.payload.showNotif})
  } else if (action.type == 'updateColor') {
    return Object.assign({}, state, {currentColor: action.payload.currentColor})
  } else if (action.type == 'updateInfo') {
    return Object.assign({}, state, {userInfo: action.payload.userInfo})
  } else return state
}

export default createStore(reducer, {
  name: 'REDUX TEST',
  dailyGoal: 0,
  currentCalorie: 0,
  showNotif: false,
  currentColor: '#78CC5B',
  userInfo: {
    age: '',
    height: '',
    weight: '',
    gender: '',
    lifestyle: ''
  }
})
