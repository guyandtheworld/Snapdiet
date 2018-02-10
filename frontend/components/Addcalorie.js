import React from 'react';
import {connect} from 'react-redux';
import {ScrollView, StyleSheet, View, AsyncStorage, TouchableNativeFeedback, AppState, FlatList, TextInput, TouchableOpacity} from 'react-native';
import {Picker, Text, Button, Form, Item, Label, Input, Icon, Fab} from 'native-base';
import {Grid, Col, Row} from 'react-native-easy-grid';
import foodData from './FoodCalorie.json';
import foodInfo from './foodCalorieArrays.json';

class Addcalorie extends React.Component{
    constructor(props){
        super(props);
        this.state={
            currentCalorie:0,
            selectedItem:'',
            selectedSubItem:'',
            foodItems:[],
            foodSubItems:[],
            items:'',
            subItems:'',
            displaySubItems:false,
            disableAddButton:true,

            foodNames:[],
            foodValues:[],
            foodNameEntered:'',
            data:[],
            chosenFoods:[],
            chosenCalories:[],
            totalCalorie:0
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
        },()=>{
            this.setState({
                foodNames:foodInfo.foodNames,
                foodValues:foodInfo.foodValues,
                currentCalorie:this.props.currentCalorie
            });
        });
    }

    addCalories=() => {
        this.setState({
            currentCalorie:this.state.currentCalorie+this.state.totalCalorie,
            totalCalorie:0
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

      /*displaySubMenu=(value) => {
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
    }*/

    updateList=(text) => {
        this.setState({
            foodNameEntered:text
        },() => {
            if(text!=""){
                let displayList=this.state.foodNames.filter((item) => {
                    return(item.toLowerCase().indexOf(text.toLowerCase())!=-1);
                });
                this.setState({
                    data:displayList
                });
            }
            else{
                this.setState({
                    data:[]
                })
            }
        });
    }

    choseItem=(item) => {
        let total=0;
        this.setState({
            data:[],
            foodNameEntered:'',
            chosenFoods:this.state.chosenFoods.concat([item]),
            chosenCalories:this.state.chosenCalories.concat([this.state.foodValues[this.state.foodNames.indexOf(item)]])
        },() => {
            for(i in this.state.chosenCalories){
                total+=parseInt(this.state.chosenCalories[i]);
            }
            if(total!=0){
                this.setState({
                    totalCalorie:total,
                    disableAddButton:false
                });
            }
        });
    }

    removeItem=(item) => {
        console.log(item);
        for(i in this.state.chosenFoods){
            if(this.state.chosenFoods[i]==item){
                //Remove food name
                let arr=this.state.chosenFoods;
                arr.splice(i,1);
                this.setState({
                    chosenFoods:arr
                },() => {
                    //Remove food calorie
                    let arr=this.state.chosenCalories;
                    arr.splice(i,1);
                    this.setState({
                        chosenCalories:arr
                    },() => {
                        //Recalculate total
                        let total=0;
                        for(i in this.state.chosenCalories){
                            total+=this.state.chosenCalories[i];
                        }
                        if(total==0){
                            this.setState({
                                totalCalorie:0,
                                disableAddButton:true
                            });
                        }
                        else{
                            this.setState({
                                totalCalorie:total
                            });
                        }
                    });
                });
            }
        }
    }

    render(){
        const chosenFoods=this.state.chosenFoods.map((food) => {
            return(
                    <Text style={{color:'rgba(0,0,0,0.87)'}}>{food}</Text>
            );
        });

        const chosenCalories=this.state.chosenCalories.map((calorie) => {
            return(
                    <Text style={{color:'rgba(0,0,0,0.87)', fontWeight:'500'}}>{calorie}</Text>
            );
        });

        const removeButtons=this.state.chosenFoods.map((food) => {
            return(
                    <TouchableOpacity onPress={() => {this.removeItem(food)}}>
                        <View style={styles.removeButton}>
                            <Text style={{fontSize:12, color:'white'}}>X</Text>
                        </View>
                        <View style={{height:7}}/>
                    </TouchableOpacity>
            );
        });

        return(
            <View style={styles.container}>
                <Item>
                    <Input style={{color:'black'}} onChangeText={(text)=> {this.updateList(text)}} placeholder='Type food name...' value={this.state.foodNameEntered}/>
                </Item>
                    <FlatList 
                        style={styles.list}
                        data={this.state.data}
                        renderItem={(item) => {
                            return(
                                <View key={item.index}>
                                    <TouchableOpacity style={styles.listItem} onPress={() => {this.choseItem(item.item)}}>
                                            <Text style={{color:'black'}}>{item.item}</Text>
                                    </TouchableOpacity>                                
                                    <View style={{borderBottomColor: 'rgba(0,0,0,0.2)',borderBottomWidth: 1}}/>
                                </View>
                            );
                        }}
                    />
                {/*<Form>
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
                    </Form>*/}
                <View style={{height:20}}/>

                <Grid>
                    <Col size={45}>
                        <Row size={8}>
                            <Text style={{fontWeight:'700'}}>Food</Text>
                        </Row>
                        <Row size={92} style={{flexDirection:'column'}}>
                            {chosenFoods}
                        </Row>
                    </Col>
                    <Col size={45}>
                        <Row size={8}>
                            <Text style={{fontWeight:'700'}}>Calorie</Text>
                        </Row>
                        <Row size={92} style={{flexDirection:'column'}}>
                            {chosenCalories}
                        </Row>
                    </Col>
                    <Col size={10}>
                         <Row size={8}/>
                        <Row size={92} style={{flexDirection:'column'}}>
                            {removeButtons}
                        </Row>
                    </Col>
                </Grid>

                <View>
                    <Button disabled={this.state.disableAddButton} onPress={() => {this.addCalories()}} style={{marginTop:'10%'}}><Text>Add</Text></Button>
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
        alignItems:'center'
    },
    snapchatYellow:{
        backgroundColor:'rgb(255,252,0)'
    },
    list:{
        position:'absolute',
        zIndex:101,
        top:60,
        left:20,
        width:'100%',
        backgroundColor:'rgba(255,255,255,1.0)'
    },
    listItem:{
        width:'100%',
        height:40,
        justifyContent:'center',
    },
    removeButton:{
        backgroundColor:'red',
        borderRadius:100,
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
  
  )(Addcalorie);