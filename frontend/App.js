import * as Expo from 'expo';
import React from 'react';
import {StatusBar, Platform} from 'react-native';
import {Provider} from 'react-redux';
import {TabNavigator, DrawerNavigator} from 'react-navigation';
import Main from './components/Main';
import CameraTest from './components/CameraTest';
import Calorie from './components/Calorie';
import Store from './components/Store';
import GetInfo from './components/getInfo';
import Login from './components/Login';
import Sidebar from './components/Sidebar';

const Tabnavigation=TabNavigator(
  {
    Home:{screen:Main},
    Calorie:{screen:Calorie},
  },
  {
    tabBarOptions:{
      style:{
        backgroundColor:'rgb(255,252,0)',
      },
      labelStyle:{
        color:'rgb(0,0,0)'
      },
      indicatorStyle:{
        backgroundColor:'rgb(37,211,102)'
      },
      activeTintColor:'rgb(0,0,0)',
      inactiveTintColor:'rgb(70,70,70)'
    }
  }
);

const Drawernavigation=DrawerNavigator(
  {
    Home:{screen:Tabnavigation},
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


//paddingTop:Platform.OS=='ios'?0:StatusBar.currentHeight <--Use inside tabBarOptions.style if statusbar overlaps tabs