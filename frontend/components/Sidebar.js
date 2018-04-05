import React from 'react';
import { StyleSheet, View, TouchableNativeFeedback, Image, ImageBackground, NetInfo } from 'react-native';
import { Container, Text, H2, Thumbnail, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import Notif from './Notification';
import Login from './Login';
import GetInfo from './getInfo';


class Sidebar extends React.Component {

    constructor(props){
        super(props);
        this.state={
            isOnline:false
        }
    }

    componentWillMount(){
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            if(connectionInfo.type=="wifi" || connectionInfo.type=="cellular"){
                this.setState({
                    isOnline:true
                })
            }
        });
    }

    goToLogin=() => {
        this.props.navigation.navigate('Login');
    }

    editInfo=() => {
        this.props.navigation.navigate('GetInfo');
    }
    render(){
        cover = require('./sidebar_cover.jpg');
        pic = require('./sidebar_pic.png');
        return(
            <Container>
                <Grid>
                    <Row size={30}>    
                        <ImageBackground source={cover} style={{width:'100%'}}>
                            <View style={styles.coverContainer}>
                                {(this.props.pic=='' || this.props.pic==null || this.state.isOnline==false)?
                                <Thumbnail large source={pic} />
                                :<Thumbnail large source={{uri:this.props.pic}}/>
                                }
                                <Text style={{color:'white', fontSize:38, fontWeight:'800'}}>{this.props.name}</Text>
                            </View>
                        </ImageBackground>
                    </Row>
                    <Row size={10}>
                        <TouchableNativeFeedback onPress={this.goToLogin}>
                            <View style={styles.sideBarView}>
                                <Icon style={{color:'gray'}} name='contact'/>
                                <Text style={styles.sideBarText}>  Login/Sign up</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </Row>
                    <Row size={10}>
                        <TouchableNativeFeedback onPress={this.editInfo}>
                            <View style={styles.sideBarView}>
                                <Icon style={{color:'gray'}} name='create'/>
                                <Text style={styles.sideBarText}>  Edit Personal Info</Text>
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
        fontFamily:'openSans'
    },
    sideBarView:{
        width:'100%',
        alignItems:'center',
        flexDirection:'row',
        marginLeft:20
    },
    coverContainer:{
        height:'100%',
        justifyContent:'flex-end',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.2)'
    }
});

export default connect(
    (store) => {
        return store;
    }
)(Sidebar);