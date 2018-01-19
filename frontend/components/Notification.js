import React from 'react';
import { Notifications } from 'expo';
import { connect } from 'react-redux';
import { Text,  View, Switch, AsyncStorage} from 'react-native';
import {Left, Right} from 'native-base';

class Notif extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showNotif:false,
			notifTitle: "SnapDiet",
			notifMessage: "Touch to add calorie",			
		};
		this.putNotif = this.putNotif.bind(this);
	}

	componentDidMount(){
		this.setState({showNotif:this.props.showNotif});
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
			this.props.update('updateNotif',{showNotif:this.state.showNotif});

			storeNotifStateOffline = async () => {
                try{
					await AsyncStorage.setItem('SNAPDIET_NOTIFSTATE',this.state.showNotif.toString());
                }
                catch(e){
                    console.log(e);
                }
			}
			
            storeNotifStateOffline();
		}
		);
	}

	render() {
		return (
			<View style={{width:'100%',flexDirection:'row',justifyContent:'center'}}>
				<Left>
					<Text style={{fontSize:18, paddingLeft:20}}>Notification:</Text>
				</Left>
				<Right style={{paddingRight:20}}>
					<Switch value={this.state.showNotif} onValueChange={this.notifToggle}/>
				</Right>
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