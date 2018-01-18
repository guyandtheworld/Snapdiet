import React from 'react';
import { Notifications } from 'expo';
import { Text,  View, Button } from 'react-native';
import {connect} from 'react-redux';



class Notif extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			notifTitle: "SnapDiet",
			notifMessage: "Touch to add calorie",			
		};

		this.putNotif = this.putNotif.bind(this);

	}

	putNotif() {

		Notifications.dismissAllNotificationsAsync();

		const localNotification = {
		    title: this.state.notifTitle,
		    body: this.state.notifMessage, 
		    sticky: true,
		    sound: false,
		    priority: 'max',
		}
		  

		let t = new Date();
		t.setSeconds(t.getSeconds() + 1);
		const schedulingOptions = {
		    time: t, // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
		    //intervalMs: 2000
		};

		Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
	}
  

	render() {
		return (

			<View>
				{ this.putNotif() }
			</View>

		);
	}
}

export default connect(
    (store) => {
        return store;
    }
)(Notif);