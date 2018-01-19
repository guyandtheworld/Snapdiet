import {createStore} from 'redux';

const reducer=(state,action) => {
    if(action.type=='TEST'){
        return Object.assign({},state,{name:'SUCCESS'});
    }
    if(action.type=='updateCalorie'){
        return Object.assign({},state,{currentCalorie:action.payload.currentCalorie});
    }
    if(action.type=='updateGoal'){
        return Object.assign({},state,{dailyGoal:action.payload.dailyGoal});
    }
    if(action.type=='updateNotif'){
        return Object.assign({},state,{showNotif:action.payload.showNotif});
    }
    else return state;
}

export default createStore(reducer,{
    name:'REDUX TEST',
    dailyGoal:0,
    currentCalorie:0,
    showNotif:false
});