import * as Expo from 'expo';
import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, KeyboardAvoidingView, NetInfo, ToastAndroid, AsyncStorage } from 'react-native';
import { writeToDatabase, readFromDatabase } from '../firebase';
import { Text, Button, Input, Form, Item, Label } from 'native-base';
import firebase from '../firebase';


class LoginWithEmail extends React.Component {
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
    
    loginWithEmail = () => {
      login = async () => {
            //ADD LOGIN LOGIC HERE
      }
      NetInfo.getConnectionInfo().then((connectionInfo) => {
        if(connectionInfo.type=="wifi" || connectionInfo.type=="cellular"){
          login();
        }
        else{
          ToastAndroid.show('Network error. Please check your connection.', ToastAndroid.LONG);
        }
      });
    }

    logout = () => {
      NetInfo.getConnectionInfo().then((connectionInfo) => {
        if(connectionInfo.type=="wifi" || connectionInfo.type=="cellular"){
          //ADD LOGOUT LOGIC HERE
        }
        else{
          ToastAndroid.show('Network error. Please check your connection.', ToastAndroid.LONG);
        }
      });
    }

render() {
    return (
      <KeyboardAvoidingView keyboardVerticalOffset={-64} behavior='padding' style={styles.container}>
          <Form style={styles.formStyle}>
          {
            (this.props.uid=='' || this.props.uid==null)?
                <View style={{ width:'90%' }}>
                     <Item floatingLabel>
                        <Label>Username</Label>
                        <Input />
                    </Item>
                    <Item floatingLabel>
                        <Label>Password</Label>
                        <Input secureTextEntry />
                    </Item>
                    <View style={{ height: 16 }} />
                    <Button full info style={{ marginLeft:15, marginRight:15 }} onPress={this.loginWithEmail}><Text>Login</Text></Button>	
                    <View style={{ height: 16 }} />
                    <Button full info style={{ marginLeft:15, marginRight:15 }} onPress={this.loginWithEmail}><Text>Sign up</Text></Button>	
                </View>
                :
                <Button full warning style={{ marginLeft:15, marginRight:15 }} onPress={this.logout}><Text>Logout</Text></Button>	
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