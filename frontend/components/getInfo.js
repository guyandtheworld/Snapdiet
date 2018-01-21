import React, { Component } from 'react';
import {View, StyleSheet, Button, ScrollView, AsyncStorage} from 'react-native';
import {connect} from 'react-redux';

import t from 'tcomb-form-native';

const Form = t.form.Form;

var Gender = t.enums({
  M: 'Male',
  F: 'Female',
  O: 'Other'
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
	    const value = this._form.getValue(); // Information from form is stored in value
	    console.log('value: ', value); // Check terminal for the information entered
	  }
	  
	render() {
		return(
			<View style={styles.container}>
				<ScrollView showsVerticalScrollIndicator={false} keyboardDismissMode='on-drag'>
						<Form 
							ref={c => this._form = c} 
							type={GetThings} 
							options={options} 
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