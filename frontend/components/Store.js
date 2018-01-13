import {createStore} from 'redux';

const reducer=(state,action) => {
    if(action.type=='TEST'){
        return Object.assign({},state,{name:'SUCCESS'});
    }
    else return state;
}

export default createStore(reducer,{
    name:'REDUX TEST',
});