import React, { Component } from 'react';
import {View, TextInput, Switch, Picker, StyleSheet, Button, ScrollView, AsyncStorage, ToastAndroid, StatusBar, TouchableHighlight} from 'react-native';
import {Text} from 'native-base';
import {connect} from 'react-redux';


class GetInfo extends React.Component {


	constructor(props) {
	  super(props);
	
	  this.state = {
	  	age: 18,
	  	weight: 50,
	  	height: 150,
	  	lifeStyles: 'A',
	  	gender: 'M',
	  	imperial: false,
	  	wUnits: "KG",
	  	hUnits: "CM",
	  };
	}

	handleSubmit = () => {


		this.props.update('updateInfo',{userInfo:value});
		AsyncStorage.setItem('SNAPDIET_FIRSTLAUNCH','1');

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
			if (this.state.imperial == false) {
				height = this.state.height * 0.393701;
				weight = this.state.weight * 2.20462;
			}
			else {
				height = this.state.height;
				weight = this.state.weight ;
			}
			age = this.state.age;
			lifeStyle = this.state.lifeStyles;
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

	imperialSwitch = () => {

		if (this.state.imperial == true)
			this.setState({
				imperial: false,
				hUnits: "CM",
				wUnits: "KG",
			});
		else
			this.setState({
				imperial: true,
				hUnits: "Ft",
				wUnits: "Lbs",
			});

	}

	render() {
		return(
			<View style={styles.container}>

				<ScrollView showsVerticalScrollIndicator={false} keyboardDismissMode='on-drag'>
						
						<Text> Age: </Text>
						<TextInput
							style={styles.inputBox}
							keyboardType = 'numeric'
							onChangeText = {(text) => {}}
						/>

						<Text> Height (in {this.state.hUnits}): </Text> 
						<TextInput
							style={styles.inputBox}
							keyboardType = 'numeric'
							onChangeText = {(text) => {}}
						/>

						<Text> Weight (in {this.state.wUnits}): </Text> 
						<TextInput
							style={styles.inputBox}
							keyboardType = 'numeric'
							onChangeText = {(text) => {}}
						/>

						<View style={styles.imperialView}>

							<Text> Imperial Units </Text> 
							<Switch
								onValueChange={this.imperialSwitch}
								value={this.state.imperial}
							/>

						</View>

						<Text> Gender: </Text> 
						<Picker
							selectedValue={this.state.gender}
							onValueChange={(genderSelected) => {this.setState({gender: genderSelected})}}
						>

							<Picker.Item label="Male" value="M" />
							<Picker.Item label="Female" value="F" />

						</Picker>

						<Text> Lifestyle: </Text> 
						<Picker
							selectedValue={this.state.lifestyle}
							onValueChange={(lifestyleSelected) => {this.setState({lifeStyles: lifestyleSelected})}}
						>

							<Picker.Item label="Very Lightly Active" value="A" />
							<Picker.Item label="Lightly Active" value="B" />
							<Picker.Item label="Moderately Active" value="C" />
							<Picker.Item label="Very Active" value="D" />
							<Picker.Item label="Extremely Active" value="E" />

						</Picker>


						<TouchableHighlight style={styles.button} onPress={this.handleSubmit} underlayColor='#ff6a6a'>
				          <Text style={styles.buttonText}>SAVE</Text>
				        </TouchableHighlight>

				</ScrollView>
				
			</View>			
		);
	}
}

const styles = StyleSheet.create({
  container: {
	minHeight:'100%',
    justifyContent: 'center',
	padding: 20,
  },
  button: {
    height: 36,
    backgroundColor: '#ff5a5a',
    borderColor: '#ff5a5a',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  inputBox: {
  	height: 40, 
  	marginTop:5,
  	marginBottom:10,
  	paddingLeft: 5,
  },
  imperialView: {
  	flexDirection: 'row',
  	marginTop: 5,
  	marginBottom: 8,
  }
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


