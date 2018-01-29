import React, { Component, Proptypes } from 'react';
import { Notifications } from 'expo';
import { connect } from 'react-redux';
import { Text,  View, Switch, AsyncStorage, AppState } from 'react-native';
import {Left, Right} from 'native-base';

class Notif extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showNotif:false,
			notifTitle: "Touch to add calorie",
			notifMessage: "Some % completed",		
		};
		this.putNotif = this.putNotif.bind(this);
	}

	componentDidMount() {
    	AppState.addEventListener('change', this.putNotif);
  	}

  	componentWillUnmount() {
    	AppState.removeEventListener('change', this.nothing());
  	}

  	nothing () {

  	}

	putNotif(){
		if (AppState.currentState == 'active')
			Notifications.dismissAllNotificationsAsync();

		const localNotification = {
		    title: this.state.notifTitle,
			body: this.state.notifMessage,
			android:{
				sticky: true,
				priority:'max'
			}
		}
		console.log(AppState.currentState);
		if (AppState.currentState == 'background')
			Notifications.presentLocalNotificationAsync(localNotification);
	}
	

	render() {
		return (
			<View>
			</View>
		);
	}
}

export default connect(
	(store) => {
        return store;
    },
    (dispatch) => {
        return{
            update:(dispatchType,dispatchPayload) => {
                dispatch({type:dispatchType,payload:dispatchPayload});
            }
        }
    }
)(Notif); 