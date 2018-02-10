import React, { Component } from 'react';
import {View, StyleSheet, Button, ScrollView, AsyncStorage, ToastAndroid} from 'react-native';
import {Text, H2} from 'native-base';
import {connect} from 'react-redux';

import t from 'tcomb-form-native';

const Form = t.form.Form;

var Gender = t.enums({
  M: 'Male',
  F: 'Female'
});

var LifeStyles = t.enums({
	A: 'Sedentary',
	B: 'Lightly Active',
	C: 'Moderately Active',
	D: 'Very Active',
	E: 'Extremely Active'
});

const GetThings = t.struct({
	age: t.Number,
	height: t.Number,
	weight: t.Number,
	gender: Gender,
	lifestyle: LifeStyles,	
});

const options = {
	fields: {
		age: {
			error: "Age is required",
		},
		height: {
			label: "Height(in cm)",
			error: "Height is required",
		},
		weight: {
			label: "Weight(in Kgs)",
			error: "Weight is required",
		},
		gender: {
			error: "Please select a gender",
		},
		lifestyle: {
			label: "Your Lifestyle & Nature of Work",
			error: "Please choose an option",
		},

	},
};


class GetInfo extends React.Component {

	handleSubmit = () => {
	  const value = this._form.getValue();
		if(value!=null){
				this.props.update('updateInfo',{userInfo:value});
		}
		ToastAndroid.show('Information saved!', ToastAndroid.LONG);
		this.props.navigation.goBack();
	}

	componentDidUpdate(){
		storeUserInfoOffline = async () => {
			try{
			  await AsyncStorage.setItem('SNAPDIET_USERINFO',JSON.stringify(this.props.userInfo));
			}
			catch(e){
			  console.log(e);
			}
		  }
		storeUserInfoOffline();

		calculateDailyGoal = () => {
			//Converting height from cm to inches and weight from kg to pounds
			height = this.props.userInfo.height * 0.393701;
			weight = this.props.userInfo.weight * 2.20462;
			age = this.props.userInfo.age;
			lifeStyle = this.props.userInfo.lifeStyles;
			activityLevel = 1.2;
			dailyGoal = 0;
	
			if (this.props.userInfo.gender === 'M') {
					dailyGoal = (12.7*height) + (6.23*weight) - (6.8*age) + 66;
			}
			else {
					dailyGoal = (4.7*height) + (4.35*weight) - (4.7*age) + 655;
			}
			
			switch(lifeStyle) {
					case 'A': 
							dailyGoal *= 1.2;
							break;
					case 'B': 
							dailyGoal *= 1.375;
							break;
					case 'C': 
							dailyGoal *= 1.55;
							break;
					case 'D': 
							dailyGoal *= 1.725;
							break;
					case 'E': 
							dailyGoal *= 1.9;
							break;
			}
			dailyGoal = Math.floor(dailyGoal);
			this.props.update('updateGoal',{dailyGoal:dailyGoal});
			storeDailyGoalOffline = async () => {
				try{
						await AsyncStorage.setItem('SNAPDIET_DAILYGOAL',dailyGoal.toString());
				}
				catch(e){
						console.log(e);
				}
			}
			storeDailyGoalOffline();
		}

		calculateDailyGoal();
	}

	componentWillMount(){
		getUserInfoOffline = async () => {
			try{
			  await AsyncStorage.getItem('SNAPDIET_USERINFO',(error,data) => {
				if(error){
				  console.log(error);
				}
				else if(data==null){
				  console.log("Data does not exist");
				}
				else{
				  this.props.update('updateInfo',{userInfo:JSON.parse(data)});
				}
			  });
			}
			catch(e){
			  console.log(e);
			}
		  }
		getUserInfoOffline();
	}

	render() {
		return(
			<View style={styles.container}>
				<H2>Welcome to Snapdiet!</H2>
				<Text>Please fill in some information to calculate an optimized daily calorie goal for you.</Text>
				<ScrollView showsVerticalScrollIndicator={false} keyboardDismissMode='on-drag'>
						<Form 
							ref={c => this._form = c} 
							type={GetThings} 
							options={options} 
							value={this.props.userInfo}
						/> 
						<Button title="Save" onPress={this.handleSubmit} />
				</ScrollView>
			</View>			
		);
	}
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 10,
	padding: 20,
    backgroundColor: '#ffffff',
  },
});

export default connect(
    (store) => {
        return store;
	},
	(dispatch) => {
        return {
            update:(dispatchType,dispatchPayload) => {
                dispatch({type:dispatchType,payload:dispatchPayload});
            }
        }
    }
)(GetInfo);