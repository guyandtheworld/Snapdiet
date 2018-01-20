import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, KeyboardAvoidingView, AsyncStorage} from 'react-native';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {Text, H1, Container, Content, Button, Card, CardItem, Body, Form, Item, Label, Input} from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';

class Calorie extends React.Component{
    constructor(){
        super();
        this.state={
            calorieConsumed: '0',
            dailyGoal:'0',
        }
    }

    textbind=(text) => {
        if(!isNaN(text) && text!=''){
            this.setState({
                dailyGoal:parseInt(text),
                weeklyGoal:parseInt(text)*7,
                monthlyGoal:parseInt(text)*31,
                currentCalorie:0,
            });
        }
        else{
            this.setState({
                weeklyGoal:'',
                monthlyGoal:'',
            });
        }
    }

    setDailyGoal=() => {
        this.props.update('updateGoal',{dailyGoal:this.state.dailyGoal});
        storeDailyGoalOffline = async () => {
            try{
                await AsyncStorage.setItem('SNAPDIET_DAILYGOAL',this.state.dailyGoal.toString());
            }
            catch(e){
                console.log(e);
            }
        }
        storeDailyGoalOffline();
    }

    render(){
        return(
            <KeyboardAvoidingView behavior='padding' >
                <View style = {styles.container}>
                    <Text style = {styles.header} > Calories consumed: </Text>
                    <Text style = {styles.currentCal} > {this.state.calorieConsumed} </Text>
                    <Text style = {styles.header} > Daily Calorie Goal: </Text>
                    <Text style = {styles.goalCal} > {this.state.dailyGoal} </Text>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = EStyleSheet.create({
    container: {
        marginVertical: 45,
        alignItems: 'center',
    },
    header: {
        fontSize: 35,
        fontWeight: 'bold',
        marginTop: 10,
    },
    currentCal: {
        fontSize: 100,
        color: '$neutralBlue',
        fontWeight: 'bold',
    },
    goalCal: {
        fontSize: 100,
        fontWeight: 'bold',
        color: '$goalGreen',
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
)(Calorie);
