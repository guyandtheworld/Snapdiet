import * as Expo from 'expo';
import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, KeyboardAvoidingView} from 'react-native';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {Text, H1, Container, Content, Button, Card, CardItem, Body, Form, Item, Label, Input, Icon} from 'native-base';
import firebase from '../firebase';


class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
          placeholder:''
        };
    }
    
    loginWithFacebook = async () => {
      const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
        '2074407626180948',{ permissions: ['public_profile'] }
      );
    
      if (type == 'success') {
        console.log("LOGIN WITH FB WORKED");
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
    
        firebase.auth().signInWithCredential(credential).then((result) => {
          console.log(result)
          this.props.update('UID',{uid:result.providerData[0].uid})
          this.props.update('USERNAME',{name:result.providerData[0].displayName})
          this.props.update('USERPIC',{pic:result.providerData[0].photoURL})
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

  }
});

export default connect(
    (store) => {
        return store;
    },
    (dispatch) => {
        return{update:(dispatchAction,dispatchPayload) => {
                dispatch({type:dispatchAction,payload:dispatchPayload});
            }
        }
    }

)(Login);
