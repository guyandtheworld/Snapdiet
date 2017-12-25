import * as Expo from 'expo';
import React from 'react';
import {TabNavigator} from 'react-navigation';
import {StyleSheet, View} from 'react-native';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {Text, H1, Container, Content, Button, Card, CardItem, Body, Form, Item, Label, Input} from 'native-base';
import CameraTest from './CameraTest';

class Main extends React.Component {
  constructor(){
    super();
    this.state={
      userInputColor:'rgba(255,255,255,0.6)',
      passInputColor:'rgba(255,255,255,0.6)'
    };
  }
  render() {
    return (
      <Container style={{backgroundColor:'rgba(0,0,0,0.87)', padding:10, justifyContent:'center'}}>
          <Form style={{height:'70%', backgroundColor:'rgb(50,50,50)', alignItems:'center'}}>
          <View style={{height:30}}/>
            <H1 style={{color:'rgba(255,255,255,0.87)'}}>Welcome!</H1>
            <Item floatingLabel style={{width:'70%',borderColor:this.state.userInputColor}}>
              <Label style={{color:this.state.userInputColor}}>Username</Label>
              <Input style={{color:'white'}} onFocus={()=>this.setState({userInputColor:'rgb(10,220,220)'})} onBlur={()=>this.setState({userInputColor:'rgba(255,255,255,0.6)'})}/>
            </Item>
            <Item floatingLabel style={{width:'70%',borderColor:this.state.passInputColor}}>
              <Label style={{color:this.state.passInputColor}}>Password</Label>
              <Input secureTextEntry={true} style={{color:'white'}} onFocus={()=>this.setState({passInputColor:'rgb(10,220,220)'})} onBlur={()=>this.setState({passInputColor:'rgba(255,255,255,0.6)'})}/>
            </Item>
            <View style={{height:20}}/>
            <Button full success style={{marginLeft:15, marginRight:15}}><Text>Log In</Text></Button>
            <View style={{height:10}}/>
            <Button full primary style={{marginLeft:15, marginRight:15}}><Text>Sign Up</Text></Button>
          </Form>
      </Container>
    );
  }
}


const Tabnavigation=TabNavigator(
  {
    Home:{screen:Main},
    Camera:{screen:CameraTest}
  },
  {
    tabBarOptions:{
      style:{
        backgroundColor:'rgb(50,50,50)'
      },
      labelStyle:{
        color:'rgba(255,255,255,0.7)'
      },
      indicatorStyle:{
        backgroundColor:'rgb(10,220,220)'
      },
      activeTintColor:'rgb(10,220,220)',
      inactiveTintColor:'rgba(255,255,255,0.7)'
    }
  }
);

export default class App extends React.Component {
  state = { fontsAreLoaded: false };

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({fontsAreLoaded: true});
  }

  render() {
    if (this.state.fontsAreLoaded)
      return <Tabnavigation/>;
    else
      return <Expo.AppLoading/>;
  }
}