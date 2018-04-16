import * as Expo from 'expo';
import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, KeyboardAvoidingView, NetInfo, ToastAndroid, AsyncStorage } from 'react-native';
import { writeToDatabase, readFromDatabase } from '../firebase';
import { Text, Button, Form } from 'native-base';
import firebase from '../firebase';


class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
          
        };
    }

    fetchUserInfo = async (uid) => {
      let userInfo = await readFromDatabase(uid);
      if(userInfo!=null || userInfo!=undefined){
        this.props.update('updateHistoryConsumed',{consumed:userInfo.actualCalories});
        this.props.update('updateHistoryGoals',{goals:userInfo.goalCalories});
        this.props.update('updateHistoryDates',{dates:userInfo.dates});
      }
    }
    
    loginWithFacebook = () => {
      loginFB = async () => {
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
          '2074407626180948',{ permissions: ['public_profile'] }
        );
      
        if (type == 'success') {
          const credential = firebase.auth.FacebookAuthProvider.credential(token);
      
          firebase.auth().signInWithCredential(credential).then((result) => {
            console.log(result);
            this.props.update('UID',{uid:result.providerData[0].uid});
            this.props.update('USERNAME',{name:result.providerData[0].displayName});
            this.props.update('USERPIC',{pic:result.providerData[0].photoURL});

            AsyncStorage.setItem('LOCAL_UID',result.providerData[0].uid);
            AsyncStorage.setItem('LOCAL_NAME',result.providerData[0].displayName);
            AsyncStorage.setItem('LOCAL_PIC',result.providerData[0].photoURL);

            if(this.props.uid != null && this.props.uid != ''){
              console.log("fetching details of invalid user");
              NetInfo.getConnectionInfo().then((connectionInfo) => {
                if(connectionInfo.type=="wifi" || connectionInfo.type=="cellular"){
                  this.fetchUserInfo(this.props.uid);
                }
              });

              NetInfo.getConnectionInfo().then((connectionInfo) => {
                if(connectionInfo.type=="wifi" || connectionInfo.type=="cellular"){
                  let dataBody={
                      "uid":this.props.uid,
                      "dates":this.props.dates,
                      "actualCalories":this.props.actualCalories,
                      "goalCalories":this.props.goalCalories
                  };
                  writeToDatabase(dataBody);
                }
              });

            }
          });
        }
      }
      NetInfo.getConnectionInfo().then((connectionInfo) => {
        if(connectionInfo.type=="wifi" || connectionInfo.type=="cellular"){
          loginFB();
        }
        else{
          ToastAndroid.show('Network error. Please check your connection.', ToastAndroid.LONG);
        }
      });
    }

    logout = () => {
      NetInfo.getConnectionInfo().then((connectionInfo) => {
        if(connectionInfo.type=="wifi" || connectionInfo.type=="cellular"){
          firebase.auth().signOut().then(() => {
            console.log("User signed out");
            AsyncStorage.setItem('LOCAL_UID','');
            AsyncStorage.setItem('LOCAL_NAME','Snapdiet');
            AsyncStorage.setItem('LOCAL_PIC','');
            this.props.update('UID',{uid:''});
            this.props.update('USERNAME',{name:'Snapdiet'});
            this.props.update('USERPIC',{pic:''});

          }).catch((error) => {
            console.log(error);
          });	
        }
        else{
          ToastAndroid.show('Network error. Please check your connection.', ToastAndroid.LONG);
        }
      });
    }

render() {
    return (
      <KeyboardAvoidingView keyboardVerticalOffset={-64} behavior='padding' style={styles.container}>
          
          <Form>
          {
            (this.props.uid=='' || this.props.uid==null)?
              <View>
                <Button full warning style={{marginLeft:15, marginRight:15}} onPress={ () => this.props.navigation.navigate('LoginWithEmail')}><Text>Login with Email</Text></Button>
                <View style={{ height:10 }} />
                <Button full primary style={{marginLeft:15, marginRight:15}} onPress={this.loginWithFacebook}><Text>Login with Facebook</Text></Button>
              </View>
              :<Button full primary style={{marginLeft:15, marginRight:15}} onPress={this.logout}><Text>Logout</Text></Button>	
          }
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
    justifyContent:'center',
    alignItems:'center'
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