import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, AsyncStorage, TouchableNativeFeedback, AppState} from 'react-native';
import {Picker, Text, Button, Form, Item, Label, Input, Icon, Fab} from 'native-base';
import foodData from './FoodCalorie.json';

class Addcalorie extends React.Component{
    constructor(){
        super();
        this.state={
            currentCalorie:0,
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

    componentWillMount(){
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

    addCalories=() => {
        this.setState({
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
                this.props.navigation.goBack();
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

    render(){
        return(
            <View style={styles.container}>
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
  
  )(Addcalorie);