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
            currentCalorie:0,
            caloriesConsumed:0,
            modalVisible:true,
        }
    }

    textbind=(text) => {
        if(!isNaN(text) && text!=''){
            this.setState({
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

    addCalories=() => {
        this.setState({modalVisible:false,
            currentCalorie:this.state.currentCalorie+this.state.caloriesConsumed});
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
                        <Text style={{color:'white'}}>Weekly calorie goal: {this.state.weeklyGoal}</Text>
                    </Row>
                    <Row size={10}>
                        <Text style={{color:'white'}}>Monthly calorie goal: {this.state.monthlyGoal}</Text>
                    </Row>
                    <Row size={10}>
                        <Text style={{color:'white'}}>Calories consumed today: {this.state.currentCalorie}</Text>
                    </Row>
                    <Row size={60}/>
                </Grid>

                <Fab onPress={() => {this.setState({modalVisible:true})}} position='bottomRight'>
                    <Icon name='add'/>
                </Fab>
                <Modal animationType = {'fade'} transparent = {true}
                visible = {this.state.modalVisible}
                onRequestClose = {() => { console.log("Modal has been closed.") } }>
                    <View style={{flex: 1,flexDirection: 'column',justifyContent: 'center',alignItems: 'center',backgroundColor:'rgba(0,0,0,0.6)'}}>
                        <View style = {{height:'30%', width:'85%', backgroundColor: 'rgb(50,50,50)', alignItems: 'center'}}>
                            <Form>
                                <Item floatingLabel style={{width:'80%', height:60}}>
                                    <Label style={{color:'rgba(255,255,255,0.5)'}}>Calories consumed</Label>
                                    <Input onChangeText={(text) => {this.setState({caloriesConsumed:parseInt(text)})}} keyboardType='numeric' style={{color:'white'}}/>
                                </Item>
                            </Form>
                            <Button onPress={this.addCalories} style={{marginLeft:'37%', marginTop:'10%'}}><Text>Add</Text></Button>
                        </View>
                    </View>
                </Modal>
            </KeyboardAvoidingView>
        );
    }
}

export default connect(
    (store) => {
        return store;
    }
)(Calorie);