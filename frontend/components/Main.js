import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, KeyboardAvoidingView} from 'react-native';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {Text, H1, Container, Content, Button, Card, CardItem, Body, Form, Item, Label, Input, Icon} from 'native-base';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

class Main extends React.Component {
    constructor(){
        super();
        this.state={
            showLogin:true
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
  
  render() {
    const percent=this.props.dailyGoal?(parseInt((this.props.currentCalorie/this.props.dailyGoal)*100)):0;
   
    return (
      <View style={styles.container}>
        <AnimatedCircularProgress
          size={225}
          width={13}
          fill={percent}
          tintColor={(percent<100)?'rgb(77,194,71)':'rgb(255,0,0)'}
          onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor="rgba(125,160,175,0.6)"
          rotation={180}>
          {
            (fill) => (
              <Text style={styles.percent}>
                {percent}%
              </Text>
            )
          }
        </AnimatedCircularProgress>
        <View style={{height:20}}/>
        <Text style={{color:'rgba(0,0,0,0.6)'}}>Calories consumed today vs your goal</Text>
      </View>
    );
  }
}

const styles=StyleSheet.create({
  container:{
    height:'100%',
    backgroundColor:'rgba(255,255,255,0.87)', 
    padding:10, 
    justifyContent:'center',
    alignItems:'center'
  },
  percent:{
    color:'rgba(0,0,0,0.6)',
    fontSize:50
  },
  snapchatYellow:{
    color:'rgb(255,252,0)'
  }
});

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