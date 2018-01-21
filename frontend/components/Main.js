import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, AsyncStorage, TouchableNativeFeedback, Modal, AppState} from 'react-native';
import {Picker, Text, Button, Form, Item, Label, Input, Icon, Fab} from 'native-base';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import foodData from './FoodCalorie.json';

class Main extends React.Component {
    constructor(){
        super();
        this.state={
            currentCalorie:0,
            modalVisible:false,
            selectedItem:'',
            selectedSubItem:'',
            foodItems:[],
            foodSubItems:[],
            items:'',
            subItems:'',
            displaySubItems:false,
            disableAddButton:true
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
      for (i in foodData){
          this.setState({
              foodItems:this.state.foodItems.push(i)
          });
      }
      this.setState({
          items:this.state.foodItems.map((item) => {
              return(<Picker.Item style={{height:8}} label={item} value={item} key={item}/>);
          })
      });
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
      else if(nextstate=='active'){
        getTimeOffline = async () => {
          try{
            await AsyncStorage.getItem('SNAPDIET_LASTSEENTIME',(error,data) => {
              d = new Date();
              if(parseInt(data)>d.getHours()){
                storeCurrentCalorieOffline = async () => {
                  try{
                      await AsyncStorage.setItem('SNAPDIET_CURRENTCALORIE','0');
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
    }

    addCalories=() => {
      this.setState({
          modalVisible:false,
          currentCalorie:this.state.currentCalorie+parseInt(foodData[this.state.selectedItem][this.state.selectedSubItem])
      },() => {
          this.props.update('updateCalorie',{currentCalorie:this.state.currentCalorie});
          storeCurrentCalorieOffline = async () => {
              try{
                  await AsyncStorage.setItem('SNAPDIET_CURRENTCALORIE',this.state.currentCalorie.toString());
              }
              catch(e){
                  console.log(e);
              }
          }
          storeCurrentCalorieOffline();   
      });
    }

    displaySubMenu=(value) => {
        this.setState({
            selectedItem:value,
            foodSubItems:[],
            displaySubItems:false
        },
        () => {
            for (i in foodData[value]){
                this.setState({
                    foodSubItems:this.state.foodSubItems.push(i)
                });
            }
            this.setState({
                subItems:this.state.foodSubItems.map((item) => {
                return(<Picker.Item style={{height:8}} label={item} value={item} key={item}/>);
                }),
                selectedSubItem:Object.keys(foodData[value])[0],
                displaySubItems:true,
                disableAddButton:false
            });    
        });
    }

    selectSubMenu=(value) => {
        this.setState({
            selectedSubItem:value
        });
    }

    closeModal=() => {
        this.setState({
            modalVisible:false
        });
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

        <Fab style={styles.snapchatYellow} onPress={() => {this.setState({modalVisible:true})}} position='bottomRight'>
            <Icon style={{color:'black'}} name='add'/>
        </Fab>

        <Modal animationType = {'fade'} transparent = {true}
        visible = {this.state.modalVisible}
        onRequestClose = {this.closeModal}>
            <View style={styles.modalContainer}>
                <View style = {styles.modalMain}>
                    <Form>
                        <Picker
                            mode="dialog"
                            selectedValue={this.state.selectedItem}
                            onValueChange={this.displaySubMenu}
                            style={{color:'black', width:250}}
                            >
                            {this.state.items}
                        </Picker>
                        {this.state.displaySubItems?
                            <Picker
                                mode="dialog"
                                selectedValue={this.state.selectedSubItem}
                                onValueChange={this.selectSubMenu}
                                style={{color:'black',width:250}}
                                >
                                {this.state.subItems}
                            </Picker>
                        :null}
                    </Form>
                    <View>
                        <Button disabled={this.state.disableAddButton} onPress={this.addCalories} style={{marginTop:'10%'}}><Text>Add</Text></Button>
                    </View>
                </View>
            </View>
        </Modal>

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
  },
  modalContainer:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'rgba(0,0,0,0.6)'
  },
  modalMain:{
      height:'40%', 
      width:'85%', 
      backgroundColor: 'rgb(255,255,255)', 
      alignItems: 'center', 
      justifyContent:'center',
      borderRadius:10
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