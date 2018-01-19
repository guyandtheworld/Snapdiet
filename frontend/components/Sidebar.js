import React from 'react';
import {StyleSheet, View, TouchableNativeFeedback, Switch} from 'react-native';
import {Container, Text} from 'native-base';
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
                    <Row size={5}/>
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
                    <Row size={70}/>
                </Grid>
            </Container>
        );
    }
}

const styles=StyleSheet.create({
    sideBarText:{
        fontSize:18,
        paddingLeft:20
    },
    sideBarView:{
        width:'100%',
        justifyContent:'center'
    }
});