import React from 'react';
import { Text, View, StyleSheet, AppState } from 'react-native';
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

			<View style={styles.container}> 

					<Text style={styles.boldTip}>Tip: </Text>
					<Text style={styles.tip}>{this.state.tip}</Text>

			</View>
			
		);
	}
} 

const styles = StyleSheet.create({
  
  container: {
  	marginLeft: 10,
  	alignSelf: 'center',
  	alignContent: 'center',
  	justifyContent: 'center', 
  	flexDirection: 'row',
  	flexWrap: 'wrap', 
  },

  boldTip: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,

  },

  tip: {
  	fontSize: 17,
  	justifyContent: 'center', 
		flex: 6,
		fontFamily:'openSans'
  }

});


export default Tips;