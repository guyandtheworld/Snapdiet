import React from 'react';
import { View, StyleSheet, AppState, TouchableHighlight, Text } from 'react-native';

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

	componentDidMount() {
    	console.log("Tips did mount!!");
    	this.state.current = "T" + this.state.tipNumber.toString();
    	this.state.tip = generalTips[this.state.current];
    	console.log("tipnumber:" + this.state.tipNumber.toString());
  	}


	render() {

		return(
				<View>
                        <TouchableHighlight style={styles.card}>
                            <Text >Tip: {this.state.tip}</Text>
        				</TouchableHighlight>
        		</View>
		);
	}
} 

const styles = StyleSheet.create({
  
  card: {
	borderWidth: 0.1,
	padding: 10,
	backgroundColor: '#DDDDDD',
	justifyContent: 'center',
  },

});


export default Tips;