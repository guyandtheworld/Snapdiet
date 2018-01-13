import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, KeyboardAvoidingView, TouchableNativeFeedback, Modal} from 'react-native';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {Picker, Text, H1, Container, Content, Button, Card, CardItem, Body, Form, Item, Label, Input, Icon, Fab} from 'native-base';
import foodData from '../../backend/jsonData/FoodCalorie.json';

class Calorie extends React.Component{
    constructor(){
        super();
        this.state={
            weeklyGoal:'',
            monthlyGoal:'',
            currentCalorie:0,
            modalVisible:true,
            selectedItem:'',
            selectedSubItem:'',
            foodItems:[],
            foodSubItems:[],
            items:'',
            subItems:'',
            displaySubItems:false,
            disableAddButton:true
        }
    }

    componentWillMount(){
        for (i in foodData){
            this.setState({
                foodItems:this.state.foodItems.push(i)
            });
        }
        this.setState({
            items:this.state.foodItems.map((item) => {
                return(<Picker.Item style={{height:8}} label={item} value={item} key={item}/>);
            })
        });
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
        this.setState({
            modalVisible:false,
            currentCalorie:this.state.currentCalorie+parseInt(foodData[this.state.selectedItem][this.state.selectedSubItem])
        });
    }

    displaySubMenu=(value) => {
        this.setState({
            selectedItem:value,
            foodSubItems:[],
            displaySubItems:false
        },
        () => {
            for (i in foodData[value]){
                this.setState({
                    foodSubItems:this.state.foodSubItems.push(i)
                });
            }
            this.setState({
                subItems:this.state.foodSubItems.map((item) => {
                return(<Picker.Item style={{height:8}} label={item} value={item} key={item}/>);
                }),
                selectedSubItem:Object.keys(foodData[value])[0],
                displaySubItems:true,
                disableAddButton:false
            });    
        });
    }

    selectSubMenu=(value) => {
        this.setState({
            selectedSubItem:value
        });
    }

    closeModal=() => {
        this.setState({
            modalVisible:false
        });
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
                onRequestClose = {this.closeModal}>
                    <View style={{flex: 1,flexDirection: 'column',justifyContent: 'center',alignItems: 'center',backgroundColor:'rgba(0,0,0,0.6)'}}>
                        <View style = {{height:'40%', width:'85%', backgroundColor: 'rgb(50,50,50)', alignItems: 'center', justifyContent:'center'}}>
                            <Form>
                                <Picker
                                    mode="dialog"
                                    selectedValue={this.state.selectedItem}
                                    onValueChange={this.displaySubMenu}
                                    style={{color:'white', width:250}}
                                    >
                                    {this.state.items}
                                </Picker>
                                {this.state.displaySubItems?
                                    <Picker
                                        mode="dialog"
                                        selectedValue={this.state.selectedSubItem}
                                        onValueChange={this.selectSubMenu}
                                        style={{color:'white', width:250}}
                                        >
                                        {this.state.subItems}
                                    </Picker>
                                :null}
                            </Form>
                            <View>
                                <Button disabled={this.state.disableAddButton} onPress={this.addCalories} style={{marginTop:'10%'}}><Text>Add</Text></Button>
                            </View>
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