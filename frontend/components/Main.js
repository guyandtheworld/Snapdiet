import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, AsyncStorage, TouchableNativeFeedback, AppState} from 'react-native';
import {Picker, Text, Button, Form, Item, Label, Input, Icon, Fab} from 'native-base';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import foodData from './FoodCalorie.json';

class Main extends React.Component {
    constructor(){
        super();
        this.state={
            currentCalorie:0,
        };
    }
    
    componentDidMount(){
      getCurrentCalorieOffline = async () => {
        try{
          await AsyncStorage.getItem('SNAPDIET_CURRENTCALORIE',(error,data) => {
            if(error){
              console.log(error);
              this.props.update('updateCalorie',{currentCalorie:0});
            }
            else if(data==null){
              console.log("Data does not exist");
              this.props.update('updateCalorie',{currentCalorie:0});
            }
            else{
              this.props.update('updateCalorie',{currentCalorie:parseInt(data)});
              this.setState({
                currentCalorie:this.props.currentCalorie
              });
            }
          });
        }
        catch(e){
          console.log(e);
        }
      }

      getDailyGoalOffline = async () => {
        try{
          await AsyncStorage.getItem('SNAPDIET_DAILYGOAL',(error,data) => {
            if(error){
              console.log(error);
              this.props.update('updateGoal',{dailyGoal:0});
            }
            else if(data==null){
              console.log("Data does not exist");
              this.props.update('updateGoal',{dailyGoal:0});
            }
            else{
              this.props.update('updateGoal',{dailyGoal:parseInt(data)});
            }
          });
        }
        catch(e){
          console.log(e);
        }
        getCurrentCalorieOffline();
      }

      getDailyGoalOffline();

      getNotifStateOffline = async () => {
        try{
          await AsyncStorage.getItem('SNAPDIET_NOTIFSTATE',(error,data) => {
            if(error){
              console.log(error);
              this.props.update('updateNotif',{showNotif:false});
            }
            else if(data==null){
              console.log("Data does not exist");
              this.props.update('updateNotif',{showNotif:false});
            }
            else{
              this.props.update('updateNotif',{showNotif:(data=='true')?true:false});
            }
          });
        }
        catch(e){
          console.log(e);
        }
      }
      getNotifStateOffline();
    }

    componentWillMount(){
      AppState.addEventListener('change',this.appStateChanged);

      getTimeOffline = async () => {
        try{
          await AsyncStorage.getItem('SNAPDIET_LASTSEENTIME',(error,data) => {
            d = new Date();
            if(parseInt(data)>d.getHours()){
              storeCurrentCalorieOffline = async () => {
                try{
                    await AsyncStorage.setItem('SNAPDIET_CURRENTCALORIE','0');
                    this.props.update('updateCalorie',{currentCalorie:0});
                }
                catch(e){
                    console.log(e);
                }
              }
              storeCurrentCalorieOffline(); 
            }
          });
        }
        catch(e){
          console.log(e);
        }
      }
      getTimeOffline(); 

    }

    appStateChanged=(nextstate) => {
      if(nextstate=='background'){
        d = new Date();
        storeTimeOffline = async () => {
          try{
            await AsyncStorage.setItem('SNAPDIET_LASTSEENTIME',d.getHours().toString());
          }
          catch(e){
            console.log(e);
          }
        }
        storeTimeOffline();
      }
    }

  render() {
    const percent=this.props.dailyGoal?(parseInt((this.props.currentCalorie/this.props.dailyGoal)*100)):0;
    console.log(percent);
    if(percent>=80 && percent<100){
      this.props.update('updateColor',{currentColor:'#FFCC00'});
    }
    else if(percent>=100){
      this.props.update('updateColor',{currentColor:'#FF3232'});
    }
    else{
      this.props.update('updateColor',{currentColor:'#78CC5B'});
    }
    
    return (
      <View style={styles.container}>        
        <AnimatedCircularProgress
          size={225}
          width={13}
          fill={percent}
          tintColor={(percent<100)?'rgb(77,194,71)':'rgb(255,0,0)'}
          onAnimationComplete={() => {}}
          backgroundColor="rgba(125,160,175,0.6)"
          rotation={0}>
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
        <View style={{height:70,justifyContent:'center',alignItems:'center'}}>
        <TouchableNativeFeedback>
        <Button style={styles.snapchatYellow} onPress={() => {this.props.navigation.navigate('Calorie')}}>
          <Icon style={{color:'black'}} name='create'/>
        </Button>
        </TouchableNativeFeedback>
        </View>

        <Fab style={styles.snapchatYellow} onPress={() => {this.props.navigation.navigate('Addcalorie')}} position='bottomRight'>
            <Icon style={{color:'black'}} name='add'/>
        </Fab>

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
    backgroundColor:'rgb(255,252,0)'
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

)(Main);