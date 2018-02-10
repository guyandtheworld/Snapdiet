import React from 'react';
import {View, StyleSheet, Button, ScrollView, AsyncStorage, ToastAndroid} from 'react-native';
import {Text, H1} from 'native-base';
import Swiper from 'react-native-swiper';
import GetInfo from './getInfo';

export default class FirstScreen extends React.Component{
    
    render(){
        return(
            <Swiper style={styles.wrapper} loop={false} showsButtons={true}>
                <View style={styles.slide1}>
				    <H1 style={styles.header}>Welcome to SnapDiet!</H1>
                    <Text style={styles.subHeader}> Track what you eat. Live healthy. </Text>
                    <View style={{height:100}}/>
				    <Text style={{color:'rgba(0,0,0,0.7)'}}>Please fill in some information on the next screen to calculate an optimized daily calorie goal for you.</Text>
                </View>
                <GetInfo navigation={this.props.navigation}/>
            </Swiper>
        );
    }
}

const styles= StyleSheet.create({
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(255,252,0)',
        padding:40
    },
    header: {
        color: 'rgba(0,0,0,0.87)',
        fontWeight: 'bold',
    },
    subHeader: {
        color: 'rgba(0,0,0,0.5)',
        fontWeight: 'bold',
    }
});