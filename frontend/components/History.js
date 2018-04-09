import React from 'react';
import {connect} from 'react-redux';
import { StyleSheet, View, AsyncStorage, FlatList, TouchableOpacity, ScrollView, Animated, Easing, ImageBackground, Alert} from 'react-native';
import {Text, Button, Input, Item, Icon} from 'native-base';
import PureChart from 'react-native-pure-chart';
import * as Animatable from 'react-native-animatable';

class History extends React.Component{
    constructor(props){
        super(props);
        this.state={
            dates:['23/02/18','24/02/18','25/02/18','26/02/18','27/02/18','28/02/18'],
            actualCalories:[1500,1800,1400,1750,1450,1100],
            goalCalories:[1600,1600,1600,1600,1600,1600],
            historyHasloaded:false,
            chartHeight: new Animated.Value(170),
            chartOpacity: new Animated.Value(1.0),
        };
    }

    componentWillMount(){
        this.setState({
            dates:this.props.dates,
            actualCalories:this.props.actualCalories,
            goalCalories:this.props.goalCalories,
            historyHasloaded:true
        });
    }
    
    fadeUp = () => {
        Animated.parallel([
            Animated.timing(
                this.state.chartHeight,
                { 
                    toValue: 0,
                    duration:250
                }
            ),
            Animated.timing(
                this.state.chartOpacity,
                { 
                    toValue: 0.0,
                    duration:250
                }
            )
        ]).start();
    }

    fadeDown = () => {
        Animated.parallel([
            Animated.timing(
                this.state.chartHeight,
                { 
                    toValue: 170,
                    duration:250
                }
            ),
            Animated.timing(
                this.state.chartOpacity,
                { 
                    toValue: 1.0,
                    duration:250
                }
            )
        ]).start();
    }

    handleScroll = (event) => {
        //console.log(this.state.chartHeight);
        if(event.nativeEvent.contentOffset.y==0)
            this.fadeDown();
        else if(event.nativeEvent.contentOffset.y>=0)
            this.fadeUp();
    }
    
    clearHistory = () => {
        Alert.alert(
            'This will clear your history',
            '',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => this.clearConfirmed()},
            ],
            { cancelable: true }
        )
    }

    clearConfirmed = () => {
        AsyncStorage.setItem('SNAPDIET_HISTORY_CONSUMED',JSON.stringify([0]));
        AsyncStorage.setItem('SNAPDIET_HISTORY_GOALS',JSON.stringify([0]));
        AsyncStorage.setItem('SNAPDIET_HISTORY_DATES',JSON.stringify(['0']));
        this.props.update('updateHistoryConsumed',{consumed:[0]});
        this.props.update('updateHistoryGoals',{goals:[0]});
        this.props.update('updateHistoryDates',{dates:[0]});
        this.setState({
            dates:['0'],
            actualCalories:[0],
            goalCalories:[0]
        });
    }

    render(){
        const bgimg=require('./background.jpg');

        let consumedData=[];
        for(i in this.state.actualCalories){
            consumedData = consumedData.concat([{x:this.state.dates[i], y:this.state.actualCalories[i]}]);
        }

        let goalData=[];
        for(i in this.state.goalCalories){
            goalData = goalData.concat([{x:this.state.dates[i], y:this.state.goalCalories[i]}]);
        }

        let data = [
            {
              seriesName: 'Consumed',
              data: consumedData,
              color: 'purple'
            },
            {
              seriesName: 'Goal',
              data: goalData,
              color: 'red'
            }
          ];

        return(
            <ImageBackground source={bgimg} style={{height:'auto', width:'auto', minHeight:'100%', minWidth:'100%'}}>
            <ScrollView contentContainerStyle={styles.container} onScroll={(event) => {}}>
            
            {
                this.state.historyHasloaded?
                    this.props.dates[0]!='0'?
                        <View>
                            <View style={{height:20}}/>

                            <TouchableOpacity onPress={() => {}}>
                                <Animated.View style={{height:this.state.chartHeight, opacity:this.state.chartOpacity}}>
                                    <View style={{padding:15}}>
                                        <PureChart data={data} type='line'/>
                                    </View>
                                </Animated.View>
                            </TouchableOpacity>

                            <View style={styles.listItemHeader}>
                                <Text style={{color:'black',fontFamily:'openSans-bold',fontSize:14}}>Date</Text>
                                <View style={{width:30}}/>
                                <Text style={{color:'black',fontFamily:'openSans-bold', fontSize:14}}>Calories consumed</Text>
                                <View style={{width:30}}/>
                                <Text style={{color:'black',fontFamily:'openSans-bold',fontSize:14}}>Target</Text>
                            </View>
                            
                            <FlatList 
                                data={this.state.actualCalories}
                                renderItem={({item,index}) => {
                                    const clr=item>this.state.goalCalories[index]?'rgb(255,0,0)':'rgb(46,204,113)';
                                    return(
                                        <View style={{padding:1}} key={index}>
                                            <View style={styles.listItem}>
                                                <Text style={{color:'black',fontFamily:'openSans',fontSize:18}}>{this.state.dates[index]}</Text>
                                                <View style={{width:65}}/>
                                                <Text style={{color:'black',fontFamily:'openSans-bold', fontSize:18, color:clr}}>{item}</Text>
                                                <View style={{width:55}}/>
                                                <Text style={{color:'black',fontFamily:'openSans',fontSize:18}}>{this.state.goalCalories[index]}</Text>
                                            </View>
                                            <View style={{borderBottomColor: 'rgba(0,0,0,0.1)',borderBottomWidth: 1}}/>
                                        </View>
                                    );
                                }}
                                scrollEnabled={false}
                            />

                            <View style={{height:20}}/>
                            <Button style={styles.clearButton} onPress={() => this.clearHistory()} bordered danger>
                                <Text style={{color:'black'}}> Clear History </Text>
                            </Button>
                            <View style={{height:20}}/>

                        </View>
                    :
                    <View style={{height:'100%', justifyContent:'center'}}>
                        <Text style={{fontSize:20, color:'grey'}}>No History Found</Text>
                    </View>
                
                :
                <View style={{height:'100%', justifyContent:'center'}}>
                        <Text style={{fontSize:20, color:'grey'}}>Loading...</Text>
                </View>
            }
        
            </ScrollView>
            </ImageBackground>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        minHeight:'100%',
        backgroundColor:'rgba(255,255,255,0.7)',
        alignItems:'center'
    },
    listItem:{
        width:'100%',
        height:45,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        shadowColor:'black',
        elevation:1,
        backgroundColor:'rgb(240,235,230)',
        borderRadius:50
    },
    listItemHeader:{
        width:'100%',
        height:40,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginLeft:0
    },
    clearButton:{
        marginLeft:20,
        alignSelf:'center'
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