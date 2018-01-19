import React from 'react';
import { Notifications } from 'expo';
import { Text,  View, Switch} from 'react-native';
import {Left, Right} from 'native-base';

export default class Notif extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showNotif:false,
			notifTitle: "SnapDiet",
			notifMessage: "Touch to add calorie",			
		};
		this.putNotif = this.putNotif.bind(this);
	}

	putNotif(){
		Notifications.dismissAllNotificationsAsync();

		const localNotification = {
		    title: this.state.notifTitle,
			body: this.state.notifMessage,
			android:{
				sticky: true,
				priority:'max'
			}
		}
		Notifications.presentLocalNotificationAsync(localNotification);
	}
	
	notifToggle=() => {
		this.setState({
			showNotif:!(this.state.showNotif)
		},() => {
			if(this.state.showNotif){
				this.putNotif();
			}
			else{
				Notifications.dismissAllNotificationsAsync();
			}
		}
		);
	}

	render() {
		return (
			<View style={{width:'100%',flexDirection:'row',justifyContent:'center'}}>
				<Left>
					<Text style={{fontSize:18, paddingLeft:20}}>Notification:</Text>
				</Left>
				<Right>
					<Switch value={this.state.showNotif} onValueChange={this.notifToggle}/>
				</Right>
			</View>
		);
	}
}