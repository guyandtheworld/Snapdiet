import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, KeyboardAvoidingView} from 'react-native';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {Text, H1, Container, Content, Button, Card, CardItem, Body, Form, Item, Label, Input, Icon} from 'native-base';

class Main extends React.Component {
    constructor(){
        super();
        this.state={
            userInputColor:'rgba(255,255,255,0.6)',
            passInputColor:'rgba(255,255,255,0.6)',
            confPassInputColor:'rgba(255,255,255,0.6)',
            showLogin:true,
        };
        }

        handleSignup=() => {
            this.setState({showLogin:false});
        }
  
  render() {
    return (
      <KeyboardAvoidingView keyboardVerticalOffset={-64} behavior='padding' style={{height:'100%',backgroundColor:'rgba(0,0,0,0.87)', padding:10, justifyContent:'center'}}>
          <Form style={{height:'80%', backgroundColor:'rgb(50,50,50)', alignItems:'center'}}>
          {(this.state.showLogin)?
            <View style={{height:30}}/>:
            <Button transparent light iconLeft onPress={() => this.setState({showLogin:true})}><Icon name='arrow-back'/></Button>
          }
            <H1 style={{color:'rgba(255,255,255,0.87)'}}>Welcome!</H1>
            <Item floatingLabel style={{width:'70%',borderColor:this.state.userInputColor}}>
              <Label style={{color:this.state.userInputColor}}>Username</Label>
              <Input style={{color:'white'}} onFocus={()=>this.setState({userInputColor:'rgb(10,220,220)'})} onBlur={()=>this.setState({userInputColor:'rgba(255,255,255,0.6)'})}/>
            </Item>
            <Item floatingLabel style={{width:'70%',borderColor:this.state.passInputColor}}>
              <Label style={{color:this.state.passInputColor}}>Password</Label>
              <Input secureTextEntry={true} style={{color:'white'}} onFocus={()=>this.setState({passInputColor:'rgb(10,220,220)'})} onBlur={()=>this.setState({passInputColor:'rgba(255,255,255,0.6)'})}/>
            </Item>
            {(this.state.showLogin)?null:
            <Item floatingLabel style={{width:'70%',borderColor:this.state.confPassInputColor}}>
              <Label style={{color:this.state.confPassInputColor}}>Confirm password</Label>
              <Input secureTextEntry={true} style={{color:'white'}} onFocus={()=>this.setState({confPassInputColor:'rgb(10,220,220)'})} onBlur={()=>this.setState({confPassInputColor:'rgba(255,255,255,0.6)'})}/>
            </Item>}
            <View style={{height:20}}/>
            {(this.state.showLogin)?
              <Button full success style={{marginLeft:15, marginRight:15}} onPress={this.props.update}><Text>Log In</Text></Button>
            :null}
            <View style={{height:10}}/>
            <Button full primary style={{marginLeft:15, marginRight:15}} onPress={this.handleSignup}><Text>Sign Up</Text></Button>
          </Form>
      </KeyboardAvoidingView>
    );
  }
}

export default connect(
    (store) => {
        return store;
    },
    (dispatch) => {
        return{update:() => {
                dispatch({type:'TEST'});
            }
        }
    }

)(Main);