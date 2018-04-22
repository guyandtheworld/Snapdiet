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
			notifMessage: 0,		
		};
		this.putNotif = this.putNotif.bind(this);
	}

	componentDidMount() {
		AppState.addEventListener('change', this.putNotif);
		Notifications.dismissAllNotificationsAsync();
	}

  	componentWillUnmount() {
    	AppState.removeEventListener('change', this.putNotif);
  	}

	putNotif(){
		if (AppState.currentState == 'active')
			Notifications.dismissAllNotificationsAsync();

		const localNotification = {
		    title: this.state.notifTitle,
			body: parseInt(((parseInt(this.props.currentCalorie)/parseInt(this.props.dailyGoal)))*100).toString() + "% of today's goal consumed",
			android:{
				sticky: true,
				priority:'max'
			}
		}
		if (AppState.currentState == 'background') {
			Notifications.dismissAllNotificationsAsync();
			Notifications.presentLocalNotificationAsync(localNotification);
		}

	}
	

	render() {
		return (
			<View/>
		);
	}
}

export default connect(
	(store) => {
        return store;
    }
)(Notif); 