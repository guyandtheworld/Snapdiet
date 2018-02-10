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
			notifMessage: 50,		
		};
		this.putNotif = this.putNotif.bind(this);
	}

	componentDidMount() {
		AppState.addEventListener('change', this.putNotif);
	}

	componentWillUpdate(){
		console.log(this.props.currentCalorie,this.props.dailyGoal);
	}

  	componentWillUnmount() {
    	AppState.removeEventListener('change');
  	}

	putNotif(){
		if (AppState.currentState == 'active')
			Notifications.dismissAllNotificationsAsync();

		const localNotification = {
		    title: this.state.notifTitle,
			body: this.state.notifMessage.toString() + "% of today's goal consumed",
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
			<View/>
		);
	}
}

export default connect(
	(store) => {
        return store;
    }
)(Notif); 