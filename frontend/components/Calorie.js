import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, KeyboardAvoidingView, AsyncStorage} from 'react-native';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {Text, H1, Container, Content, Button, Card, CardItem, Body, Form, Item, Label, Input} from 'native-base';

class Calorie extends React.Component{
    constructor(){
        super();
        this.state={
            dailyGoal:'',
            weeklyGoal:'',
            monthlyGoal:'',
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
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Form style={{flexDirection:'row'}}>
                    <Item stackedLabel style={styles.calorieGoalInput}>
                        <Label>Daily calorie goal:</Label>
                        <Input keyboardType='numeric' style={{color:'black'}} onChangeText={this.textbind}/>
                    </Item>
                    <Button onPress={this.setDailyGoal} style={styles.calorieSetButton}><Text>Set</Text></Button>
                </Form>
                <Grid>
                    <Row size={10}/>
                    <Row size={10}>
                        <Text style={{color:'black'}}>Weekly calorie goal: {this.state.weeklyGoal}</Text>
                    </Row>
                    <Row size={10}>
                        <Text style={{color:'black'}}>Monthly calorie goal: {this.state.monthlyGoal}</Text>
                    </Row>
                    <Row size={10}>
                        <Text style={{color:'black'}}>Calories consumed today: {this.props.currentCalorie}</Text>
                    </Row>
                    <Row size={60}/>
                </Grid>
            </KeyboardAvoidingView>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        height:'100%',
        backgroundColor:'rgba(255,255,255,0.87)',
        padding:10
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
