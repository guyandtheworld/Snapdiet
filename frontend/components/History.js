import React from 'react';
import {connect} from 'react-redux';
import { StyleSheet, View, AsyncStorage, FlatList, TouchableOpacity} from 'react-native';
import {Text, Button, Input, Item, Icon} from 'native-base';
import {Grid, Col, Row} from 'react-native-easy-grid';

class History extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>404 not found</Text>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        height:'100%',
        backgroundColor:'rgba(255,255,255,0.87)', 
        padding:10,
        alignItems:'center'
    }
  });
  
  export default connect(
      (store) => {
          return store;
      },
      (dispatch) => {
          return{
              update:(dispatchType,dispatchPayload) => {
                  dispatch({type:dispatchType,payload:dispatchPayload});
              }
          }
      }
  )(History);