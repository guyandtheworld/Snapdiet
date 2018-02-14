import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, AsyncStorage, TouchableNativeFeedback, AppState, Image} from 'react-native';
import {Picker, Text, Button, Form, Item, Label, Input, Icon, Fab} from 'native-base';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import foodData from './FoodCalorie.json';
import Tips from './Tips/Tips';

class Main extends React.Component {
    constructor(){
        super();
        this.state={
            currentCalorie:0
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


     /* getNotifStateOffline = async () => {
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
      getNotifStateOffline();*/
    }


    componentWillMount() {
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
    
      getFirstLaunchOffline = async () => {
        try{
            await AsyncStorage.getItem('SNAPDIET_FIRSTLAUNCH_TEST',(error, data) => {
              if(error){
                console.log(error);
              }
              else if(data==null){
                firstLaunchDone = async () => {
                  await AsyncStorage.setItem('SNAPDIET_FIRSTLAUNCH_TEST','1');
                }
                firstLaunchDone();
                this.props.navigation.navigate('FirstScreen');
              }
            });
          }
          catch(e){
            console.log(e);
          }
        }
      getFirstLaunchOffline();
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
//    this.props.update("updatePercent",{percent:percent});
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
      <View> 
        
        <View style={styles.container}> 

          <Tips />
     
          <AnimatedCircularProgress
            size={225}
            width={13}
            fill={percent}
            tintColor={(percent<100)?'#b166ae':'rgb(255,0,0)'}
            onAnimationComplete={() => {  }}
            backgroundColor="rgba(125,160,175,0.6)"
            rotation={0}>
            {
              (fill) => (
                <View style={{alignItems:'center'}}>
                  <Text style={styles.percent}>
                    {percent}%
                  </Text>
                  <Text style={styles.percentText}>Of your daily goal reached</Text>
                </View>
              )
            }
          </AnimatedCircularProgress>
          <View style={{height:18}}/>

          <View style={{height:70,justifyContent:'center',alignItems:'center'}}>

            <TouchableNativeFeedback>
              <Button style={styles.snapchatYellow} onPress={() => {this.props.navigation.navigate('Calorie')}} bordered danger>
                <Icon style={{color:'black'}} name='create'/> 
              </Button>
            </TouchableNativeFeedback>

          </View>
          <Fab style={styles.fabDesign} onPress={() => {this.props.navigation.navigate('Addcalorie')}} position='bottomRight'>
              <Icon style={{color:'black'}} name='add'/>
          </Fab>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  percentText:{
    fontSize:12,
    fontFamily:'openSans',
    color:'rgba(0,0,0,0.5)'
  },
  snapchatYellow:{
    backgroundColor:'white',
  },
  fabDesign: {
    backgroundColor:'#ff5a5a',
    width: 60,   
    height: 60,
    borderRadius: 40,
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
