import React from 'react';
import { View, StyleSheet} from 'react-native';
import {Text} from 'native-base';
import tips from './HealthTip.json';

var generalTips = tips["General"];

var tipNumber = 1;

class Tips extends React.Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
		current: "T1",
		tipNumber: Math.floor((Math.random() * 21) + 1),
		tip: "Hello",
	  };
	}

	componentWillMount() {
    	console.log("Tips did mount!!");
    	this.state.current = "T" + this.state.tipNumber.toString();
    	this.state.tip = generalTips[this.state.current];
    	console.log("tipnumber:" + this.state.tipNumber.toString());
  	}


	render() {

		return(
					<View style={styles.card}>
						<Text style={{fontFamily:'openSans', fontSize:14}}>Tip: {this.state.tip}</Text>
					</View>
		);
	}
} 

const styles = StyleSheet.create({
  card: {
		backgroundColor:'rgb(255,243,224)',
		borderRadius: 7,
		padding: 10,
		justifyContent: 'center',
		borderColor:'rgb(175,175,175)',
		borderWidth:0.5,
		shadowColor:'black',
		elevation:1,
		marginTop:20
  },
});

export default Tips;