import React from 'react';
import {StyleSheet, View, TouchableNativeFeedback, Image, ImageBackground} from 'react-native';
import {Container, Text, H2, Thumbnail} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import Notif from './Notification';
import Login from './Login';
import GetInfo from './getInfo';


export default class Sidebar extends React.Component {

    goToLogin=() => {
        this.props.navigation.navigate('Login');
    }

    editInfo=() => {
        this.props.navigation.navigate('GetInfo');
    }

    render(){
        return(
            <Container>
                <Grid>
                    <Row size={30}>    
                        <ImageBackground source={{uri:'https://drop.ndtv.com/albums/COOKS/pasta-vegetarian/pastaveg_640x480.jpg'}} style={{width:'100%'}}>
                            <View style={styles.coverContainer}>
                                <Thumbnail large source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsAUelg7yg0mepGMf-N93hh6E9XrLnKwsKa4YEQ6swhDknk4F9eQ'}} />
                                <Text style={{color:'white', fontSize:38, fontWeight:'800'}}>SnapDiet</Text>
                            </View>
                        </ImageBackground>
                    </Row>
                    <Row size={10}>
                        <TouchableNativeFeedback onPress={this.goToLogin}>
                            <View style={styles.sideBarView}>
                                <Text style={styles.sideBarText}>Login/Sign up</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </Row>
                    <Row size={10}>
                        <TouchableNativeFeedback onPress={this.editInfo}>
                            <View style={styles.sideBarView}>
                                <Text style={styles.sideBarText}>Edit Personal Info</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </Row>
                    <Row size={10}>
                        <TouchableNativeFeedback>
                            <Notif/>
                        </TouchableNativeFeedback>
                    </Row>
                    <Row size={40}/>
                </Grid>
            </Container>
        );
    }
}

const styles=StyleSheet.create({
    sideBarText:{
        fontSize:18,
        paddingLeft:20,
        fontFamily:'openSans'
    },
    sideBarView:{
        width:'100%',
        justifyContent:'center'
    },
    coverContainer:{
        height:'100%',
        justifyContent:'flex-end',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.2)'
    }
});