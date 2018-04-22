import * as Expo from 'expo';
import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, KeyboardAvoidingView, NetInfo, ToastAndroid, AsyncStorage, Alert } from 'react-native';
import { writeToDatabase, readFromDatabase } from '../firebase';
import { Text, Button, Input, Form, Item, Label } from 'native-base';
import firebase from '../firebase';


class LoginWithEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: ''
        };
    }

    fetchUserInfo = async (uid) => {
      let userInfo = await readFromDatabase(uid);
      if(userInfo == null || userInfo == undefined) {
        let history = {
          'consumed':[this.props.currentCalorie],
          'goals':[this.props.dailyGoal],
          'dates':[this.props.dates],
        };
        let dataBody={
          "uid":this.props.uid,
          "name":this.props.name,
          "data":history,
        };
        writeToDatabase(dataBody);
      }
      else if(userInfo != null || userInfo != undefined && this.props.dates == ['0']) {
        userInfo = JSON.parse(userInfo);
        this.props.update('updateHistoryConsumed',{consumed:userInfo.history.consumed});
        this.props.update('updateHistoryGoals',{goals:userInfo.history.goals});
        this.props.update('updateHistoryDates',{dates:userInfo.history.dates});
        AsyncStorage.setItem('SNAPDIET_HISTORY', JSON.stringify(userInfo.history));
      }
      else {
        Alert.alert(
          'Overwrite history?',
          'Select OK to overwrite locally stored data with data from your online account',
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () => this.overwriteConfirmed(userInfo)},
          ],
          { cancelable: true }
      )
      }
    }
    
    overwriteConfirmed = (userInfo) => {
      userInfo = JSON.parse(userInfo);
      this.props.update('updateHistoryConsumed',{consumed:userInfo.history.consumed});
      this.props.update('updateHistoryGoals',{goals:userInfo.history.goals});
      this.props.update('updateHistoryDates',{dates:userInfo.history.dates});
      AsyncStorage.setItem('SNAPDIET_HISTORY', JSON.stringify(userInfo.history));
    }

    loginWithEmail = () => {
      login = async (email,password) => {
        try{
          firebase.auth().signInWithEmailAndPassword(email,password).then((user) => {
            console.log(user);
            this.props.update('UID',{uid:user.uid});
            this.fetchUserInfo(user.uid);
            ToastAndroid.show('Logged in successfully',ToastAndroid.LONG);
            this.props.navigation.goBack();
          });
	      }
	      catch(error){
		      console.log(error,toString());
	      }
      }
      NetInfo.getConnectionInfo().then((connectionInfo) => {
        if(connectionInfo.type == "wifi" || connectionInfo.type == "cellular") {
          login(this.state.email,this.state.password);
        }
        else{
          ToastAndroid.show('Network error. Please check your connection.',ToastAndroid.LONG);
        }
      });
    }

    logout = () => {
      NetInfo.getConnectionInfo().then((connectionInfo) => {
        if(connectionInfo.type=="wifi" || connectionInfo.type=="cellular") {
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
          ToastAndroid.show('Network error. Please check your connection.',ToastAndroid.LONG);
        }
      });
    }

    signUpWithEmail = () => {
      signUp = async (email,password) => {
        try{
          firebase.auth().createUserWithEmailAndPassword(email,password).then((user) => {
            console.log(user);
            this.props.update('UID',{uid:user.uid});
            this.fetchUserInfo(user.uid);
            ToastAndroid.show('Account created successfully',ToastAndroid.LONG);
            this.props.navigation.goBack();
          });
        }
        catch(error){
          console.log(error,toString())	     
        }   
      }
      NetInfo.getConnectionInfo().then((connectionInfo) => {
        if(connectionInfo.type=="wifi" || connectionInfo.type=="cellular") {
          (this.state.password.length >= 8)?
            signUp(this.state.email,this.state.password)
            :
            ToastAndroid.show('Password has to be longer than 8 characters',ToastAndroid.LONG);
        }
        else{
          ToastAndroid.show('Network error. Please check your connection.',ToastAndroid.LONG);
        }
      });
    }

  updateEmail = (value) => {
    this.setState({
      email:value,
    });
  }

  updatePass = (value) => {
    this.setState({
      password:value,
    });
  }

  render() {
    return (
      <KeyboardAvoidingView keyboardVerticalOffset={-64} behavior='padding' style={styles.container}>
          <Form style={styles.formStyle}>
            <View style={{ width:'90%' }}>
                  <Item floatingLabel>
                    <Label>Email</Label>
                    <Input onChangeText={(value) => this.updateEmail(value)} />
                </Item>
                <Item floatingLabel>
                    <Label>Password</Label>
                    <Input secureTextEntry onChangeText={(value) => this.updatePass(value)} />
                </Item>
                <View style={{ height: 16 }} />
                <Button full info style={{ marginLeft:15, marginRight:15 }} onPress={this.loginWithEmail}><Text>Login</Text></Button>	
                <View style={{ height: 16 }} />
                <Button full info style={{ marginLeft:15, marginRight:15 }} onPress={this.signUpWithEmail}><Text>Sign up</Text></Button>	
            </View>
          </Form>
      </KeyboardAvoidingView>
    );
  }
}

const styles=StyleSheet.create({
  container:{
    height:'100%',
    backgroundColor:'rgb(230,230,230)', 
    padding:16, 
    justifyContent:'center',
    alignItems:'center',
  },
  formStyle:{
      height:'100%',
      width:'100%',
      justifyContent:'center',
      alignItems:'center',
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
)(LoginWithEmail);
