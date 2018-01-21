import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, KeyboardAvoidingView, AsyncStorage, ToastAndroid, Keyboard} from 'react-native';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {Text, H1, Container, Content, Button, Card, CardItem, Body, Form, Item, Label, Input} from 'native-base';

class Calorie extends React.Component{
    constructor(){
        super();
        this.state={
            dailyGoal:'0',
            goalGreen:'#78CC5B'
        }
    }

    textbind=(text) => {
        if(!isNaN(text) && text!=''){
            this.setState({
                dailyGoal:parseInt(text),
            },()=>{console.log(this.state.dailyGoal)});
        }
        else{
            this.setState({
                dailyGoal:0,
            },()=>{console.log(this.state.dailyGoal)});
        }
    }


    calculateDailyGoal = () => {
        
        //Converting height from cm to inches and weight from kg to pounds
        height = this.state.height * 0.393701;
        weight = this.state.weight * 2.20462;
        age = this.state.age;
        lifeStyle = this.state.LifeStyles;
        activityLevel = 1.2;
        dailyGoal = 0;

        if (this.state.gender === 'M') {
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

        return Math.floor(dailyGoal);

    }

    
    setDailyGoal=() => {
        Keyboard.dismiss();
        if(this.state.dailyGoal!='' && !(isNaN(this.state.dailyGoal))){
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
            ToastAndroid.show('Daily Goal Updated!', ToastAndroid.LONG);
        }
        else{
            ToastAndroid.show('Please enter a number!', ToastAndroid.LONG);
        }
    }

    render(){
        return(
            <KeyboardAvoidingView behavior='padding' >
                <Form style={{flexDirection:'row'}}>
                     <Item stackedLabel style={styles.calorieGoalInput}>
                         <Label>Daily calorie goal:</Label>
                         <Input keyboardType='numeric' style={{color:'black'}} onChangeText={this.textbind}/>
                     </Item>
                     <Button onPress={this.setDailyGoal} style={styles.calorieSetButton}><Text>Set</Text></Button>
                </Form>

                <View style = {styles.container}>
                    <Text style = {styles.header} > Calories consumed: </Text>
                    <Text style = {[styles.currentCal,{color:this.props.currentColor}]} > {this.props.currentCalorie} </Text>
                    <Text style = {styles.header} > Daily Calorie Goal: </Text>
                    <Text style = {styles.goalCal}> {this.props.dailyGoal} </Text>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 45,
        alignItems: 'center',
    },
    header: {
        fontSize: 35,
        fontWeight: 'bold',
        marginTop: 10,
        color:'rgba(0,0,0,0.7)'
    },
    currentCal: {
        fontSize: 100,
        fontWeight: 'bold'
    },
    goalCal: {
        fontSize: 100,
        fontWeight: 'bold',
        color: '#57CBFF'
    },
    calorieGoalInput:{
        width:'70%', 
        height:70, 
        paddingLeft:5, 
        paddingRight:5
    },
    calorieSetButton:{
        marginLeft:15, 
        marginTop:15
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
)(Calorie);
