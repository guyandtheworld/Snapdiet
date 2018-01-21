import * as Expo from 'expo';
import React from 'react';
import {StatusBar, Platform, View, StyleSheet} from 'react-native';
import {Text, Icon} from 'native-base';
import {Provider} from 'react-redux';
import {StackNavigator, DrawerNavigator} from 'react-navigation';
import Main from './components/Main';
import CameraTest from './components/CameraTest';
import Calorie from './components/Calorie';
import Store from './components/Store';
import GetInfo from './components/getInfo';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import EStyleSheet from 'react-native-extended-stylesheet';

const Stacknavigation=StackNavigator(
  {
    Home:{
      screen:Main,
      navigationOptions:({navigation}) => ({
        title:'Home',
        headerStyle:{
          backgroundColor:'rgb(255,252,0)'
        },
        headerLeft:<View navigation={navigation} style={{paddingLeft:20}} onPress={() => {this.props.navigation.navigate('DrawerOpen')}}><Icon name='menu'/></View>
      })
    },
    Calorie:{
      screen:Calorie,
      navigationOptions:({navigation}) => ({
        title:'Calorie',
        headerStyle:{
          backgroundColor:'rgb(255,252,0)'
        },
      })
    },
  }
);

const Drawernavigation=DrawerNavigator(
  {
    Home:{screen:Stacknavigation},
    Login:{screen:Login},
    GetInfo:{screen:GetInfo}
  },
  {
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    contentComponent: ({navigation}) => <Sidebar navigation={navigation}/>
  }
);

export default class App extends React.Component {
  state = { fontsAreLoaded: false };

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({fontsAreLoaded: true});
  }

  render() {
    if (this.state.fontsAreLoaded)
      return <Provider store={Store}><Drawernavigation/></Provider>;
    else
      return <Expo.AppLoading/>;
  }
}

EStyleSheet.build({
  $notGoodRed: '#FF3232',
  $cautiousYellow: '#FFCC00',
  $neutralBlue: '#57CBFF',
  $goalGreen: '#78CC5B',
});

const styles = EStyleSheet.create({
  header:{
    backgroundColor:'rgb(255,252,0)',
    height:50,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: -2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    paddingTop:Platform.OS=='ios'?0:StatusBar.currentHeight
  }
});


//paddingTop:Platform.OS=='ios'?0:StatusBar.currentHeight <--Use inside tabBarOptions.style if statusbar overlaps tabs