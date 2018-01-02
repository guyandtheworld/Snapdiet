import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, KeyboardAvoidingView, TouchableNativeFeedback, Modal} from 'react-native';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {Text, H1, Container, Content, Button, Card, CardItem, Body, Form, Item, Label, Input, Icon, Fab} from 'native-base';

class Calorie extends React.Component{
    constructor(){
        super();
        this.state={
            weeklyGoal:'',
            monthlyGoal:'',
        }
    }

    textbind=(text) => {
        if(!isNaN(text) && text!=''){
            this.setState({
                weeklyGoal:parseInt(text)*7,
                monthlyGoal:parseInt(text)*31,
                currentCalorie:0,
                fabActive:false,
                showModal:false
            });
        }
        else{
            this.setState({
                weeklyGoal:'',
                monthlyGoal:'',
            });
        }
    }

    render(){
        return(
            <KeyboardAvoidingView behavior='padding' style={{height:'100%',backgroundColor:'rgba(0,0,0,0.87)', padding:10}}>
            <Text>{this.props.name}</Text>
                <Form style={{flexDirection:'row'}}>
                    <Item stackedLabel style={{width:'60%', height:60, paddingLeft:5, paddingRight:5}}>
                        <Label>Daily calorie goal:</Label>
                        <Input keyboardType='numeric' style={{color:'white'}} onChangeText={this.textbind}/>
                    </Item>
                    <Button style={{marginLeft:15, marginTop:15}}><Text>Set</Text></Button>
                </Form>
                <Grid>
                    <Row size={10}/>
                    <Row size={10}>
                        <Text style={{color:'white'}}>Weekly calorie goal:{this.state.weeklyGoal}</Text>
                    </Row>
                    <Row size={10}>
                        <Text style={{color:'white'}}>Monthly calorie goal:{this.state.monthlyGoal}</Text>
                    </Row>
                    <Row size={10}>
                        <Text style={{color:'white'}}>Calories consumed today:{this.state.currentCalorie}</Text>
                    </Row>
                    <Row size={60}/>
                </Grid>
                <Fab
                    active={this.state.fabActive}
                    direction="up"
                    containerStyle={{ }}
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomRight"
                    onPress={() => this.setState({ fabActive: !this.state.fabActive })}>
                    <Icon name="add" />
                    <Button style={{ backgroundColor: '#34A34F' }} onPress={this.setState({showModal:true})}>
                        <Icon name="cafe" />
                    </Button>
                </Fab>
            </KeyboardAvoidingView>
        );
    }
}

export default connect(
    (store) => {
        return store;
    }
)(Calorie);