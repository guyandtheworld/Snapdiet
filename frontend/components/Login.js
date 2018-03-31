import * as Expo from 'expo';
import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, KeyboardAvoidingView} from 'react-native';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {Text, H1, Container, Content, Button, Card, CardItem, Body, Form, Item, Label, Input, Icon} from 'native-base';
import firebase from '../firebase';


class Login extends React.Component {
    constructor(){
        super();
        this.state={
            userInputColor:'rgba(0,0,0,0.6)',
            passInputColor:'rgba(0,0,0,0.6)',
            confPassInputColor:'rgba(0,0,0,0.6)',
            showLogin:true,
        };
        }

    handleSignup=() => {
        this.setState({
          showLogin:false
        });
    }

    setShowLogin=() => {
	    this.setState({showLogin:true});
    }
    
    loginWithFacebook = async () => {
      const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
        '2074407626180948',{ permissions: ['public_profile'] }
      );
    
      if (type == 'success') {
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
    
        firebase.auth().signInWithCredential(credential).then((result) => {
          console.log(result.user.providerData[0].uid)
          this.props.update({uid:result.user.providerData[0].uid})
        });
      }
    }

    logout = () => {
      firebase.auth().signOut().then(() => {
        console.log("User signed out");
      }).catch((error) => {
        console.log(error);
      });	
    } 
//     fbLogin=() => {
//     	firebase.initializeApp(firebaseConfig);

// firebase.auth().onAuthStateChanged((user) => {
//   if (user != null) {
//     console.log("We are authenticated now!");
//   }

//   // Do other things
// });

// async function loginWithFacebook() {
//   const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
//     '<2074407626180948>',
//     { permissions: ['public_profile'] }
//   );

//   if (type === 'success') {
//     const credential = firebase.auth.FacebookAuthProvider.credential(token);

//     firebase.auth().signInWithCredential(credential).catch((error) => {
//       // Handle Errors here.
//     });
//   }
// }} 

render() {
    return (
      <KeyboardAvoidingView keyboardVerticalOffset={-64} behavior='padding' style={styles.container}>
          
          <Form style={styles.form}>

          {(this.state.showLogin)?
            <View style={{height:30}}/>:
            <Button transparent dark iconLeft onPress={this.setShowLogin}><Icon name='arrow-back'/></Button>
          }

            <H1 style={{color:'rgba(0,0,0,0.87)',fontFamily:'openSans'}}>{this.props.name}</H1>

            <Item floatingLabel style={{width:'70%',borderColor:this.state.userInputColor}}>
              <Label style={{color:this.state.userInputColor}}>Username</Label>
              <Input style={{color:'black'}} onFocus={()=>this.setState({userInputColor:styles.linkedinBlue})} onBlur={()=>this.setState({userInputColor:'rgba(0,0,0,0.6)'})}/>
            </Item>

            <Item floatingLabel style={{width:'70%',borderColor:this.state.passInputColor}}>
              <Label style={{color:this.state.passInputColor}}>Password</Label>
              <Input secureTextEntry={true} style={{color:'black'}} onFocus={()=>this.setState({passInputColor:styles.linkedinBlue})} onBlur={()=>this.setState({passInputColor:'rgba(0,0,0,0.6)'})}/>
            </Item>


            {(this.state.showLogin)?null:
            <Item floatingLabel style={{width:'70%',borderColor:this.state.confPassInputColor}}>
              <Label style={{color:this.state.confPassInputColor}}>Confirm password</Label>
              <Input secureTextEntry={true} style={{color:'black'}} onFocus={()=>this.setState({confPassInputColor:styles.linkedinBlue})} onBlur={()=>this.setState({confPassInputColor:'rgba(0,0,0,0.6)'})}/>
            </Item>}

            <View style={{height:20}}/>

            {(this.state.showLogin)?
              <Button full success style={{marginLeft:15, marginRight:15}} onPress={this.props.update}><Text>Login</Text></Button>
            :null}
            <View style={{height:10}}/>
            <Button full primary style={{marginLeft:15, marginRight:15}} onPress={this.handleSignup}><Text>Signup</Text></Button>
	    <View style={{height:10}}/>
            <Button full primary style={{marginLeft:15, marginRight:15}} onPress={this.loginWithFacebook}><Text>Login with Facebook</Text></Button>
	    <View style={{height:10}}/>
            <Button full primary style={{marginLeft:15, marginRight:15}} onPress={this.logout}><Text>Logout</Text></Button>	
          </Form>

      </KeyboardAvoidingView>
    );
  }
}

const styles=StyleSheet.create({
  container:{
    height:'100%',
    backgroundColor:'rgb(230,230,230)', 
    padding:10, 
    justifyContent:'center'
  },
  form:{
    height:'80%', 
    backgroundColor:'rgba(255,255,255,0.87)', 
    alignItems:'center',
    borderRadius:10

  },
  snapchatYellow:{
    color:'rgb(255,252,0)'
  },
  linkedinBlue:{
    color:'rgb(0,255,255)'
  }
});

export default connect(
    (store) => {
        return store;
    },
    (dispatch) => {
        return{update:(dispatchPayload) => {
                dispatch({type:'TEST',payload:dispatchPayload});
            }
        }
    }

)(Login);
